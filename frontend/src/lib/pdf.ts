import jsPDF from 'jspdf';
import type { ConfigurationState } from '../types';
import { MontRegularBase64, MontBoldBase64 } from './fonts/mont';
import { getCaseStudyContent } from './caseStudyContent';
import { getRecipeContent } from './recipeContent';

// Helper function to convert SVG to PNG data URL
function svgToPngDataUrl(svgString: string, width: number, height: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      reject(new Error('Could not get canvas context'));
      return;
    }

    // Set canvas size with higher resolution for better quality
    const scale = 4;
    canvas.width = width * scale;
    canvas.height = height * scale;
    ctx.scale(scale, scale);

    const img = new Image();
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      ctx.drawImage(img, 0, 0, width, height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL('image/png'));
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load SVG image'));
    };

    img.src = url;
  });
}

export async function exportToPDF(config: ConfigurationState, executiveSummary: string | null) {
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  // Add Mont fonts to the PDF
  pdf.addFileToVFS('Mont-Regular.ttf', MontRegularBase64);
  pdf.addFont('Mont-Regular.ttf', 'Mont', 'normal');

  pdf.addFileToVFS('Mont-Bold.ttf', MontBoldBase64);
  pdf.addFont('Mont-Bold.ttf', 'Mont', 'bold');

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 30; // Increased margin for more spaciousness
  const contentWidth = pageWidth - 2 * margin;

  // Brand colors
  const primaryColor: [number, number, number] = [218, 60, 4]; // #DA3C04
  const secondaryColor: [number, number, number] = [0, 51, 102]; // #003366
  const charcoalColor: [number, number, number] = [44, 47, 48]; // #2C2F30
  const tealColor: [number, number, number] = [18, 114, 149]; // #127295
  const tealLightColor: [number, number, number] = [33, 163, 177]; // #21A3B1

  // ============================================
  // PAGE 1: COVER PAGE
  // ============================================

  // Full-page navy background
  pdf.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  pdf.rect(0, 0, pageWidth, pageHeight, 'F');

  // Orange accent stripe at top
  pdf.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  pdf.rect(0, 0, pageWidth, 5, 'F');

  // Main title - centered, large, white
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(42);
  pdf.setFont('Mont', 'bold');
  const title = 'L&D Pitch Configurator';
  const titleWidth = pdf.getTextWidth(title);
  pdf.text(title, (pageWidth - titleWidth) / 2, pageHeight / 2 - 20);

  // Subtitle
  pdf.setFontSize(18);
  pdf.setFont('Mont', 'normal');
  const subtitle = 'Customized Learning & Development Proposal';
  const subtitleWidth = pdf.getTextWidth(subtitle);
  pdf.text(subtitle, (pageWidth - subtitleWidth) / 2, pageHeight / 2);

  // Configuration summary at bottom
  pdf.setFontSize(14);
  pdf.setFont('Mont', 'normal');
  const summaryText = `${config.stage?.name || 'N/A'} | ${config.ambition?.name || 'N/A'} | ${config.recipes.length} Training Recipes`;
  const summaryWidth = pdf.getTextWidth(summaryText);
  pdf.text(summaryText, (pageWidth - summaryWidth) / 2, pageHeight - 30);

  // Generated date
  pdf.setFontSize(11);
  const dateText = `Generated ${new Date().toLocaleDateString()}`;
  const dateWidth = pdf.getTextWidth(dateText);
  pdf.text(dateText, (pageWidth - dateWidth) / 2, pageHeight - 15);

  // ============================================
  // PAGE 2: EXECUTIVE SUMMARY
  // ============================================
  if (executiveSummary) {
    pdf.addPage();

    // Full-width navy header
    pdf.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    pdf.rect(0, 0, pageWidth, 40, 'F');

    // Orange accent
    pdf.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    pdf.rect(0, 40, pageWidth, 3, 'F');

    // Section title in header
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(28);
    pdf.setFont('Mont', 'bold');
    pdf.text('Executive Summary', margin, 27);

    // Content area with generous spacing
    const contentY = 60;
    pdf.setTextColor(charcoalColor[0], charcoalColor[1], charcoalColor[2]);
    pdf.setFontSize(12);
    pdf.setFont('Mont', 'normal');

    const summaryLines = pdf.splitTextToSize(executiveSummary, contentWidth - 40);
    const lineHeight = 6.5;
    let currentY = contentY;

    summaryLines.forEach((line: string) => {
      // Check if we need a new page
      if (currentY > pageHeight - 25) {
        pdf.addPage();

        // Repeat header
        pdf.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
        pdf.rect(0, 0, pageWidth, 40, 'F');
        pdf.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        pdf.rect(0, 40, pageWidth, 3, 'F');
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(28);
        pdf.setFont('Mont', 'bold');
        pdf.text('Executive Summary (continued)', margin, 27);

        // Reset position and styling
        currentY = 60;
        pdf.setTextColor(charcoalColor[0], charcoalColor[1], charcoalColor[2]);
        pdf.setFontSize(12);
        pdf.setFont('Mont', 'normal');
      }

      pdf.text(line, margin + 20, currentY);
      currentY += lineHeight;
    });
  }

  // ============================================
  // PAGE 3: CONFIGURATION DETAILS
  // ============================================
  pdf.addPage();

  // Full-width navy header
  pdf.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  pdf.rect(0, 0, pageWidth, 40, 'F');

  // Orange accent
  pdf.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  pdf.rect(0, 40, pageWidth, 3, 'F');

  // Section title
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(28);
  pdf.setFont('Mont', 'bold');
  pdf.text('Configuration Details', margin, 27);

  // Content in two columns for better use of landscape space
  let yPos = 65;
  const columnWidth = (contentWidth - 20) / 2;
  const leftColumnX = margin;
  const rightColumnX = margin + columnWidth + 20;

  // Helper function for config items
  const addConfigItem = (label: string, value: string, x: number, y: number) => {
    pdf.setFontSize(14);
    pdf.setFont('Mont', 'bold');
    pdf.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    pdf.text(label, x, y);

    pdf.setFontSize(12);
    pdf.setFont('Mont', 'normal');
    pdf.setTextColor(charcoalColor[0], charcoalColor[1], charcoalColor[2]);

    const valueLines = pdf.splitTextToSize(value, columnWidth - 10);
    valueLines.forEach((line: string, index: number) => {
      pdf.text(line, x, y + 7 + (index * 6));
    });

    return y + 7 + (valueLines.length * 6) + 12;
  };

  // Left column
  yPos = addConfigItem('Stage', config.stage?.name || 'Not selected', leftColumnX, yPos);
  if (config.stage?.description) {
    pdf.setFontSize(11);
    pdf.setFont('Mont', 'normal');
    pdf.setTextColor(100, 100, 100);
    const descLines = pdf.splitTextToSize(config.stage.description, columnWidth - 10);
    descLines.forEach((line: string) => {
      pdf.text(line, leftColumnX, yPos);
      yPos += 5;
    });
    yPos += 10;
  }

  yPos = addConfigItem('Strategic Ambition', config.ambition?.name || 'Not selected', leftColumnX, yPos);
  yPos = addConfigItem('Learning Path Type', config.path?.type === 'certification' ? 'Certification-Based' : 'Tailored Programs', leftColumnX, yPos);

  // Right column
  let rightYPos = 65;
  rightYPos = addConfigItem('Facilitation Model', config.facilitation.charAt(0).toUpperCase() + config.facilitation.slice(1), rightColumnX, rightYPos);
  rightYPos = addConfigItem('Delivery Modality', config.modality.charAt(0).toUpperCase() + config.modality.slice(1), rightColumnX, rightYPos);

  // ============================================
  // PAGES: TRAINING RECIPES (Full Content - Each on Own Page)
  // ============================================
  if (config.recipes.length > 0) {
    // Render each recipe on its own page
    config.recipes.forEach((recipe) => {
      const recipeContent = getRecipeContent(recipe.id);

      pdf.addPage();

      // Full-width navy header
      pdf.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
      pdf.rect(0, 0, pageWidth, 50, 'F');

      // Orange accent bar
      pdf.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      pdf.rect(0, 50, pageWidth, 3, 'F');

      // "RECIPE" badge - top right
      const badgeText = 'TRAINING RECIPE';
      pdf.setFontSize(6);
      pdf.setFont('Mont', 'bold');
      const badgeTextWidth = pdf.getTextWidth(badgeText);
      const badgeWidth = badgeTextWidth + 8;
      pdf.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      pdf.roundedRect(pageWidth - margin - badgeWidth, 8, badgeWidth, 7, 2, 2, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.text(badgeText, pageWidth - margin - badgeWidth + 4, 12.5);

      // Recipe title - WHITE text
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(22);
      pdf.setFont('Mont', 'bold');
      const titleLines = pdf.splitTextToSize(recipe.name, contentWidth - 60);
      let headerY = 22;
      titleLines.forEach((line: string) => {
        pdf.text(line, margin, headerY);
        headerY += 8;
      });

      // Short description as subtitle
      pdf.setFontSize(10);
      pdf.setFont('Mont', 'normal');
      pdf.setTextColor(255, 255, 255);
      const subtitleLines = pdf.splitTextToSize(recipe.description, contentWidth - 60);
      subtitleLines.forEach((line: string) => {
        pdf.text(line, margin, headerY);
        headerY += 4;
      });

      let currentY = 63;
      const lineHeight = 5;

      if (recipeContent) {
        // Full description content
        pdf.setFontSize(10);
        pdf.setFont('Mont', 'normal');
        pdf.setTextColor(charcoalColor[0], charcoalColor[1], charcoalColor[2]);

        // Split content into paragraphs
        const paragraphs = recipeContent.fullDescription.split('\n\n');

        paragraphs.forEach((paragraph) => {
          // Check if we need a new page
          if (currentY > pageHeight - 30) {
            pdf.addPage();

            // Repeat header on continued page
            pdf.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
            pdf.rect(0, 0, pageWidth, 40, 'F');
            pdf.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
            pdf.rect(0, 40, pageWidth, 3, 'F');

            // Badge on continued page
            pdf.setFontSize(6);
            pdf.setFont('Mont', 'bold');
            pdf.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
            pdf.roundedRect(pageWidth - margin - badgeWidth, 8, badgeWidth, 7, 2, 2, 'F');
            pdf.setTextColor(255, 255, 255);
            pdf.text(badgeText, pageWidth - margin - badgeWidth + 4, 12.5);

            pdf.setFontSize(16);
            pdf.setFont('Mont', 'bold');
            pdf.text(`${recipe.name} (continued)`, margin, 27);

            currentY = 52;
            pdf.setFontSize(10);
            pdf.setFont('Mont', 'normal');
            pdf.setTextColor(charcoalColor[0], charcoalColor[1], charcoalColor[2]);
          }

          // Check if paragraph is a bullet point
          if (paragraph.trim().startsWith('•')) {
            // Handle bullet points
            const bulletLines = paragraph.split('\n');
            bulletLines.forEach((bulletLine) => {
              if (bulletLine.trim().startsWith('•')) {
                // Draw teal bullet
                pdf.setFillColor(tealColor[0], tealColor[1], tealColor[2]);
                pdf.circle(margin + 3, currentY - 1, 1.2, 'F');

                // Bullet text
                const bulletText = bulletLine.trim().substring(1).trim();
                const bulletTextLines = pdf.splitTextToSize(bulletText, contentWidth - 15);
                bulletTextLines.forEach((line: string, idx: number) => {
                  pdf.text(line, margin + 8, currentY + (idx * lineHeight));
                });
                currentY += bulletTextLines.length * lineHeight + 2;
              } else if (bulletLine.trim()) {
                // Regular text line
                const textLines = pdf.splitTextToSize(bulletLine.trim(), contentWidth);
                textLines.forEach((line: string) => {
                  pdf.text(line, margin, currentY);
                  currentY += lineHeight;
                });
              }
            });
          } else if (paragraph.trim()) {
            // Check if it's a section header (short line followed by content patterns)
            const trimmedPara = paragraph.trim();
            const isHeader = (
              trimmedPara.length < 50 &&
              !trimmedPara.includes('.') &&
              (trimmedPara.includes(':') ||
               trimmedPara.match(/^(Day|For|What|The|Why|This|With)\s/))
            );

            if (isHeader) {
              // Section header styling
              pdf.setFontSize(11);
              pdf.setFont('Mont', 'bold');
              pdf.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
              pdf.text(trimmedPara, margin, currentY);
              currentY += 7;
              pdf.setFontSize(10);
              pdf.setFont('Mont', 'normal');
              pdf.setTextColor(charcoalColor[0], charcoalColor[1], charcoalColor[2]);
            } else {
              // Regular paragraph
              const paraLines = pdf.splitTextToSize(trimmedPara, contentWidth);
              paraLines.forEach((line: string) => {
                pdf.text(line, margin, currentY);
                currentY += lineHeight;
              });
              currentY += 3; // Extra space between paragraphs
            }
          }
        });
      } else {
        // Fallback if no full content available
        pdf.setFontSize(11);
        pdf.setFont('Mont', 'normal');
        pdf.setTextColor(charcoalColor[0], charcoalColor[1], charcoalColor[2]);
        const descLines = pdf.splitTextToSize(recipe.description, contentWidth);
        descLines.forEach((line: string) => {
          pdf.text(line, margin, currentY);
          currentY += lineHeight;
        });
      }
    });
  }

  // ============================================
  // PAGES: CASE STUDIES (Full Content)
  // ============================================
  if (config.caseTiles.length > 0) {
    // Render each case study on its own page(s)
    for (const caseTile of config.caseTiles) {
      const caseStudyContent = getCaseStudyContent(caseTile.id);

      if (!caseStudyContent) {
        // Fallback for case studies without full content
        pdf.addPage();

        // Full-width navy header
        pdf.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
        pdf.rect(0, 0, pageWidth, 40, 'F');

        // Orange accent
        pdf.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        pdf.rect(0, 40, pageWidth, 3, 'F');

        // Title
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(24);
        pdf.setFont('Mont', 'bold');
        pdf.text(`Case Study: ${caseTile.title}`, margin, 27);

        // Metric
        pdf.setFontSize(14);
        pdf.setFont('Mont', 'bold');
        pdf.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        pdf.text(caseTile.metric, margin, 60);

        return;
      }

      // ============================================
      // CASE STUDY PAGE 1: Hero + Key Takeaway + Context & Challenges
      // ============================================
      pdf.addPage();

      // Standardized header - 40px height like other pages
      pdf.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
      pdf.rect(0, 0, pageWidth, 40, 'F');

      // Teal accent bar
      pdf.setFillColor(tealLightColor[0], tealLightColor[1], tealLightColor[2]);
      pdf.rect(0, 40, pageWidth, 3, 'F');

      // "CASE STUDY" badge - top right
      const badgeText = 'CASE STUDY';
      pdf.setFontSize(6);
      pdf.setFont('Mont', 'bold');
      const badgeTextWidth = pdf.getTextWidth(badgeText);
      const badgeWidth = badgeTextWidth + 8;
      pdf.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      pdf.roundedRect(pageWidth - margin - badgeWidth, 8, badgeWidth, 7, 2, 2, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.text(badgeText, pageWidth - margin - badgeWidth + 4, 12.5);

      // Case study title - WHITE text
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(16);
      pdf.setFont('Mont', 'bold');
      const titleLines = pdf.splitTextToSize(caseStudyContent.title, contentWidth - 60);
      let titleY = 17;
      titleLines.forEach((line: string) => {
        pdf.text(line, margin, titleY);
        titleY += 6;
      });

      // Subtitle - WHITE text, immediately after title
      pdf.setFontSize(9);
      pdf.setFont('Mont', 'normal');
      pdf.setTextColor(255, 255, 255);
      pdf.text(caseStudyContent.subtitle, margin, titleY + 1);

      let currentY = 52;
      const lineHeight = 5.5; // Slightly more generous line height

      // Key Takeaway quote - properly centered
      const firstSentence = caseStudyContent.summary.split('.')[0] + '.';
      pdf.setFontSize(9);
      pdf.setFont('Mont', 'bold');
      const pullQuoteLines = pdf.splitTextToSize(firstSentence, contentWidth - 30);
      const quoteLineHeight = 5;
      const quoteTextHeight = pullQuoteLines.length * quoteLineHeight;
      const quotePadding = 8;
      const pullQuoteHeight = quoteTextHeight + (quotePadding * 2);

      // Quote background - teal
      pdf.setFillColor(tealColor[0], tealColor[1], tealColor[2]);
      pdf.roundedRect(margin, currentY, contentWidth, pullQuoteHeight, 3, 3, 'F');

      // Quote icon - embed SVG with corner decorations and quote mark
      const quoteIconSize = 10;
      const quoteIconY = currentY + (pullQuoteHeight - quoteIconSize) / 2;
      const quoteX = margin + 3;

      // Full SVG with yellow corners and orange quote mark
      const quoteSvg = `<svg width="269" height="279" viewBox="0 0 269 279" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M162.701 267.745V278.613H268.706V175.367H259.196V267.745H162.701Z" fill="#F8B50C"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M106.004 10.125V0H0V96.187H9.50942V10.125H106.004Z" fill="#F8B50C"/>
        <path d="M156.645 53.8934C165.165 57.8934 171.865 62.4634 178.435 69.1634C179.655 70.2534 180.875 71.3534 182.125 72.4734C189.655 80.8634 194.815 91.1334 197.345 102.083C200.985 121.293 200.635 140.103 194.605 158.723C186.735 181.243 173.455 204.143 155.435 220.163C154.775 220.163 154.115 220.163 153.435 220.163C152.775 221.483 152.115 222.803 151.435 224.163C148.915 226.333 146.405 228.363 143.755 230.353C142.995 230.923 142.235 231.493 141.455 232.083C134.425 237.323 127.065 241.853 119.435 246.163C118.495 246.723 117.545 247.283 116.575 247.853C114.565 249.033 112.505 250.113 110.435 251.163C109.775 250.833 109.115 250.503 108.435 250.163C109.415 247.683 109.415 247.683 111.065 244.413C119.455 226.893 121.345 209.963 120.165 190.693C119.925 189.533 119.685 188.363 119.435 187.163C115.865 186.353 115.865 186.353 113.155 186.343C104.625 185.783 96.5746 181.603 89.3946 177.213C77.1246 168.703 69.9446 158.573 63.2646 145.453C59.4146 136.423 57.9046 128.153 58.0046 118.353C58.0046 117.303 58.0146 116.253 58.0246 115.163C58.2946 102.323 61.7846 91.1734 68.4346 80.1634C72.5546 74.3534 77.1546 68.9434 82.4346 64.1634C83.0946 64.1634 83.7546 64.1634 84.4346 64.1634C84.4346 63.5034 84.4346 62.8434 84.4346 62.1634C106.825 47.2634 131.305 43.4734 156.645 53.8934Z" fill="#DA3C04"/>
      </svg>`;

      // Convert SVG to PNG and add to PDF
      try {
        const pngDataUrl = await svgToPngDataUrl(quoteSvg, 269, 279);
        pdf.addImage(pngDataUrl, 'PNG', quoteX, quoteIconY, quoteIconSize, quoteIconSize * (279/269));
      } catch (error) {
        // Fallback: draw simple shapes if SVG conversion fails
        pdf.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        pdf.circle(quoteX + 5, quoteIconY + 4, 3, 'F');
        pdf.ellipse(quoteX + 6, quoteIconY + 7.5, 2, 2.5, 'F');
      }

      // Quote text - properly vertically centered
      pdf.setFontSize(9);
      pdf.setFont('Mont', 'bold');
      pdf.setTextColor(255, 255, 255);
      const quoteStartY = currentY + quotePadding + (quoteLineHeight * 0.7);
      pullQuoteLines.forEach((line: string, idx: number) => {
        pdf.text(line, margin + 16, quoteStartY + (idx * quoteLineHeight));
      });

      currentY += pullQuoteHeight + 8;

      // Two-column layout for landscape
      const leftColWidth = (contentWidth - 20) / 2;
      const rightColX = margin + leftColWidth + 20;

      // LEFT COLUMN: Context
      pdf.setFontSize(12);
      pdf.setFont('Mont', 'bold');
      pdf.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
      pdf.text('Context', margin, currentY);

      pdf.setFontSize(9);
      pdf.setFont('Mont', 'normal');
      pdf.setTextColor(charcoalColor[0], charcoalColor[1], charcoalColor[2]);
      const contextLines = pdf.splitTextToSize(caseStudyContent.context, leftColWidth);
      let contextY = currentY + 6;
      contextLines.forEach((line: string) => {
        pdf.text(line, margin, contextY);
        contextY += lineHeight;
      });

      // RIGHT COLUMN: Challenges
      pdf.setFontSize(12);
      pdf.setFont('Mont', 'bold');
      pdf.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
      pdf.text('Challenges', rightColX, currentY);

      pdf.setFontSize(9);
      pdf.setFont('Mont', 'normal');
      pdf.setTextColor(charcoalColor[0], charcoalColor[1], charcoalColor[2]);
      let challengeY = currentY + 6;
      caseStudyContent.challenges.forEach((challenge) => {
        // Teal bullet - aligned with first line of text
        pdf.setFillColor(tealColor[0], tealColor[1], tealColor[2]);
        pdf.circle(rightColX + 2, challengeY - 1.5, 1.2, 'F');

        const challengeLines = pdf.splitTextToSize(challenge, leftColWidth - 10);
        challengeLines.forEach((line: string, idx: number) => {
          pdf.text(line, rightColX + 7, challengeY + (idx * lineHeight));
        });
        challengeY += challengeLines.length * lineHeight + 3;
      });

      // ============================================
      // CASE STUDY PAGE 2: Solution & Results
      // ============================================
      pdf.addPage();

      // Smaller header - 25px height
      pdf.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
      pdf.rect(0, 0, pageWidth, 25, 'F');

      // Teal accent (consistent with page 1)
      pdf.setFillColor(tealLightColor[0], tealLightColor[1], tealLightColor[2]);
      pdf.rect(0, 25, pageWidth, 3, 'F');

      // "CASE STUDY" badge - top right, vertically centered
      pdf.setFontSize(6);
      pdf.setFont('Mont', 'bold');
      const badgeTextWidth2 = pdf.getTextWidth('CASE STUDY');
      const badgeWidth2 = badgeTextWidth2 + 8;
      pdf.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      pdf.roundedRect(pageWidth - margin - badgeWidth2, 9, badgeWidth2, 7, 2, 2, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.text('CASE STUDY', pageWidth - margin - badgeWidth2 + 4, 13.5);

      // Section title - vertically centered in header
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(14);
      pdf.setFont('Mont', 'bold');
      pdf.text('Solution & Results', margin, 16);

      currentY = 38;

      // Solution section
      pdf.setFontSize(11);
      pdf.setFont('Mont', 'bold');
      pdf.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
      pdf.text('Solution', margin, currentY);

      pdf.setFontSize(9);
      pdf.setFont('Mont', 'normal');
      pdf.setTextColor(charcoalColor[0], charcoalColor[1], charcoalColor[2]);
      const solutionDescLines = pdf.splitTextToSize(caseStudyContent.solution.description, contentWidth);
      currentY += 7;
      solutionDescLines.forEach((line: string) => {
        pdf.text(line, margin, currentY);
        currentY += lineHeight;
      });

      // Solution components in a box with better padding
      currentY += 6;
      const componentLineHeight = 5;
      const componentPadding = 8;

      // Calculate box height based on content
      let totalComponentHeight = 0;
      caseStudyContent.solution.components.forEach((component) => {
        pdf.setFontSize(8);
        const compLines = pdf.splitTextToSize(component, contentWidth - 24);
        totalComponentHeight += compLines.length * componentLineHeight + 3;
      });
      const componentBoxHeight = totalComponentHeight + componentPadding * 2 + 8;

      pdf.setFillColor(248, 248, 248);
      pdf.roundedRect(margin, currentY, contentWidth, componentBoxHeight, 3, 3, 'F');

      // Key Components header
      pdf.setFontSize(9);
      pdf.setFont('Mont', 'bold');
      pdf.setTextColor(tealColor[0], tealColor[1], tealColor[2]);
      pdf.text('Key Components:', margin + componentPadding, currentY + componentPadding + 2);
      currentY += componentPadding + 8;

      // Components with better spacing
      pdf.setFontSize(8);
      pdf.setFont('Mont', 'normal');
      pdf.setTextColor(charcoalColor[0], charcoalColor[1], charcoalColor[2]);
      caseStudyContent.solution.components.forEach((component) => {
        // Teal bullet
        pdf.setFillColor(tealColor[0], tealColor[1], tealColor[2]);
        pdf.circle(margin + componentPadding + 2, currentY, 1, 'F');

        const componentLines = pdf.splitTextToSize(component, contentWidth - 24);
        componentLines.forEach((line: string, idx: number) => {
          pdf.text(line, margin + componentPadding + 6, currentY + 1 + (idx * componentLineHeight));
        });
        currentY += componentLines.length * componentLineHeight + 3;
      });

      currentY += componentPadding + 10; // More space before Results

      // Results section
      pdf.setFontSize(11);
      pdf.setFont('Mont', 'bold');
      pdf.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
      pdf.text('Results', margin, currentY);
      currentY += 8;

      // Green color for checkboxes
      const successColor: [number, number, number] = [34, 197, 94]; // Green

      // Render results with timeframe headers and green checkboxes
      caseStudyContent.results.forEach((result) => {
        // Check if we need a new page
        if (currentY > pageHeight - 40) {
          pdf.addPage();

          pdf.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
          pdf.rect(0, 0, pageWidth, 40, 'F');
          pdf.setFillColor(tealLightColor[0], tealLightColor[1], tealLightColor[2]);
          pdf.rect(0, 40, pageWidth, 3, 'F');

          // Badge on continued page
          pdf.setFontSize(6);
          pdf.setFont('Mont', 'bold');
          pdf.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
          pdf.roundedRect(pageWidth - margin - badgeWidth2, 8, badgeWidth2, 7, 2, 2, 'F');
          pdf.setTextColor(255, 255, 255);
          pdf.text('CASE STUDY', pageWidth - margin - badgeWidth2 + 4, 12.5);

          pdf.setFontSize(16);
          pdf.text('Results (continued)', margin, 27);

          currentY = 52;
        }

        // Timeframe as section header (no badge)
        pdf.setFontSize(10);
        pdf.setFont('Mont', 'bold');
        pdf.setTextColor(tealColor[0], tealColor[1], tealColor[2]);
        pdf.text(result.timeframe, margin, currentY);
        currentY += 6;

        // Metrics as list with green checkboxes
        pdf.setFontSize(9);
        pdf.setFont('Mont', 'normal');
        pdf.setTextColor(charcoalColor[0], charcoalColor[1], charcoalColor[2]);

        result.metrics.forEach((metric) => {
          // Green checkbox with white checkmark drawn manually
          const checkboxX = margin;
          const checkboxY = currentY - 3;
          const checkboxSize = 4;

          // Draw green rounded rectangle
          pdf.setFillColor(successColor[0], successColor[1], successColor[2]);
          pdf.roundedRect(checkboxX, checkboxY, checkboxSize, checkboxSize, 1, 1, 'F');

          // Draw white checkmark using lines
          pdf.setDrawColor(255, 255, 255);
          pdf.setLineWidth(0.5);
          // First stroke of checkmark (short)
          pdf.line(checkboxX + 0.8, checkboxY + 2, checkboxX + 1.5, checkboxY + 2.8);
          // Second stroke of checkmark (long)
          pdf.line(checkboxX + 1.5, checkboxY + 2.8, checkboxX + 3.2, checkboxY + 1);

          // Metric text
          pdf.setFontSize(9);
          pdf.setFont('Mont', 'normal');
          pdf.setTextColor(charcoalColor[0], charcoalColor[1], charcoalColor[2]);
          const metricLines = pdf.splitTextToSize(metric, contentWidth - 10);
          metricLines.forEach((line: string, idx: number) => {
            pdf.text(line, margin + 7, currentY + (idx * 4.5));
          });
          currentY += metricLines.length * 4.5 + 2;
        });

        currentY += 6;
      });
    }
  }

  // ============================================
  // FOOTER ON ALL PAGES
  // ============================================
  const totalPages = (pdf as any).internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    pdf.setPage(i);

    // Don't add footer to cover page
    if (i === 1) continue;

    // Subtle footer
    pdf.setFontSize(9);
    pdf.setFont('Mont', 'normal');
    pdf.setTextColor(150, 150, 150);
    pdf.text(`Page ${i} of ${totalPages}`, pageWidth - margin, pageHeight - 10, { align: 'right' });
  }

  // Save the PDF
  const fileName = `LD_Pitch_${config.stage?.id || 'config'}_${new Date().toISOString().split('T')[0]}.pdf`;
  pdf.save(fileName);
}
