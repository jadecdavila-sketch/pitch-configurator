import { Document, pdf } from '@react-pdf/renderer';
import type { ConfigurationState } from '../../types';
import { CoverSlide } from './components/CoverSlide';
import { ExecutiveSummarySlide } from './components/ExecutiveSummarySlide';
import { ConfigSummarySlide } from './components/ConfigSummarySlide';
import { TemplateSlide } from './components/TemplateSlide';
import {
  RECIPE_SLIDE_IMAGES,
  CASE_STUDY_SLIDE_IMAGES,
  CASE_STUDY_COVER_IMAGE,
} from './slideMapping';

/**
 * Split executive summary into chunks that fit on slides
 * ~2800 characters per slide to avoid overflow
 */
function splitExecutiveSummary(text: string): string[] {
  const MAX_CHARS = 2800;
  const paragraphs = text.split('\n\n');
  const pages: string[] = [];
  let currentPage = '';

  for (const para of paragraphs) {
    if ((currentPage + para).length > MAX_CHARS && currentPage.length > 0) {
      pages.push(currentPage.trim());
      currentPage = para;
    } else {
      currentPage += (currentPage ? '\n\n' : '') + para;
    }
  }

  if (currentPage) {
    pages.push(currentPage.trim());
  }

  return pages.length > 0 ? pages : [text];
}

interface GeneratePDFProps {
  config: ConfigurationState;
  executiveSummary: string;
}

export async function generatePDF({
  config,
  executiveSummary,
}: GeneratePDFProps): Promise<Blob> {
  // Split executive summary if needed
  const summaryPages = splitExecutiveSummary(executiveSummary);

  console.log('Generating PDF with config:', {
    clientName: config.clientName,
    recipeCount: config.recipes.length,
    caseStudyCount: config.caseTiles.length,
  });

  // Log recipe image paths
  config.recipes.forEach((recipe) => {
    const imagePath = RECIPE_SLIDE_IMAGES[recipe.id];
    console.log(`Recipe ${recipe.id}: ${imagePath}`);
  });

  // Log case study image paths
  config.caseTiles.forEach((caseStudy) => {
    const imagePath = CASE_STUDY_SLIDE_IMAGES[caseStudy.id];
    console.log(`Case study ${caseStudy.id}: ${imagePath}`);
  });

  const doc = (
    <Document>
      {/* Cover slide with client name */}
      <CoverSlide clientName={config.clientName} />

      {/* Executive summary slides */}
      {summaryPages.map((content, index) => (
        <ExecutiveSummarySlide key={`exec-${index}`} content={content} />
      ))}

      {/* Configuration summary */}
      <ConfigSummarySlide config={config} />

      {/* Recipe slides from template */}
      {config.recipes.map((recipe) => {
        const imagePath = RECIPE_SLIDE_IMAGES[recipe.id];
        if (!imagePath) {
          console.warn(`No image found for recipe: ${recipe.id}`);
          return null;
        }
        return <TemplateSlide key={recipe.id} imagePath={imagePath} />;
      })}

      {/* Case study slides if any selected */}
      {config.caseTiles.length > 0 && (
        <>
          {/* Case study cover */}
          <TemplateSlide imagePath={CASE_STUDY_COVER_IMAGE} />

          {/* Individual case studies */}
          {config.caseTiles.map((caseStudy) => {
            const imagePath = CASE_STUDY_SLIDE_IMAGES[caseStudy.id];
            if (!imagePath) {
              console.warn(`No image found for case study: ${caseStudy.id}`);
              return null;
            }
            return <TemplateSlide key={caseStudy.id} imagePath={imagePath} />;
          })}
        </>
      )}
    </Document>
  );

  // Generate PDF blob
  const blob = await pdf(doc).toBlob();
  return blob;
}

/**
 * Download PDF with proper filename
 */
export async function downloadPDF(config: ConfigurationState, executiveSummary: string) {
  const blob = await generatePDF({ config, executiveSummary });

  // Create filename
  const clientName = config.clientName || 'Draft';
  const sanitizedName = clientName.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_.-]/g, '');
  const filename = `L&D_Proposal_${sanitizedName}.pdf`;

  // Trigger download
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
