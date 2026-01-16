'use client';

import { useCallback, RefObject } from 'react';
import { useUIStore } from '@/stores/uiStore';
import { useReviewStore } from '@/stores/reviewStore';
import { isIOS, isMobile } from '@/lib/utils';
import { Download, Share2, Loader2 } from 'lucide-react';
import html2canvas from 'html2canvas';

interface ExportButtonProps {
  reviewRef: RefObject<HTMLDivElement>;
}

export function ExportButton({ reviewRef }: ExportButtonProps) {
  const { isExporting, setExporting } = useUIStore();
  const { currentReview } = useReviewStore();

  const handleExport = useCallback(async () => {
    if (!reviewRef.current || isExporting) return;

    setExporting(true);

    try {
      // Determine scale based on device
      const scale = isMobile() ? 9 : 3;

      // Capture the review card
      const canvas = await html2canvas(reviewRef.current, {
        scale,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false,
      });

      // Convert to blob
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
            else reject(new Error('Failed to create blob'));
          },
          'image/png',
          1.0
        );
      });

      // Generate filename
      const filename = `${currentReview.title || 'review'}-quick-review.png`;

      // On iOS, use Web Share API if available
      if (isIOS() && navigator.share && navigator.canShare) {
        const file = new File([blob], filename, { type: 'image/png' });
        const shareData = { files: [file] };

        if (navigator.canShare(shareData)) {
          await navigator.share(shareData);
        } else {
          // Fallback to download
          downloadBlob(blob, filename);
        }
      } else {
        // Download on other platforms
        downloadBlob(blob, filename);
      }

      // Also copy review text to clipboard
      const reviewText = `${currentReview.title}\n${currentReview.metadata}\n\n${currentReview.reviewText}\n\n${currentReview.scoreNames[currentReview.score - 1]}`;

      try {
        await navigator.clipboard.writeText(reviewText);
      } catch {
        // Clipboard access may be denied, ignore
      }
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export image. Please try again.');
    } finally {
      setExporting(false);
    }
  }, [reviewRef, isExporting, setExporting, currentReview]);

  return (
    <button
      onClick={handleExport}
      disabled={isExporting}
      className="flex items-center justify-center gap-2 w-full py-3 px-6
               bg-green-500 hover:bg-green-600 disabled:bg-green-500/50
               rounded-xl font-semibold text-white transition-all
               disabled:cursor-not-allowed"
    >
      {isExporting ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          Exporting...
        </>
      ) : isIOS() ? (
        <>
          <Share2 className="w-5 h-5" />
          Share Image
        </>
      ) : (
        <>
          <Download className="w-5 h-5" />
          Save as Image
        </>
      )}
    </button>
  );
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
