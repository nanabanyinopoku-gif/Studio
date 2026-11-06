import React, { useState } from 'react';
import { Smartphone, Download, Share, PlusSquare, X, CheckCircle2 } from 'lucide-react';
import { usePWAInstall, useOnlineStatus } from '../hooks/usePWAInstall';

export const PWAInstallModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [activeDeviceTab, setActiveDeviceTab] = useState<'ios' | 'android'>(isIOS ? 'ios' : 'android');

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#1C1917]/65 backdrop-blur-[2px] p-0 sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="pwa-modal-title"
    >
      <div
        className="w-full max-w-lg bg-[#FBF9F5] text-[#1C1917] border-t sm:border border-[#D6CEBE] p-6 md:p-8 space-y-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#E5DFD5] pb-4">
          <div className="flex items-center gap-2.5">
            <Smartphone className="w-5 h-5 text-[#C2410C]" />
            <h3 id="pwa-modal-title" className="text-lg font-semibold text-[#1C1917]">
              Install Apex Koncepts on iOS & Android
            </h3>
          </div>
          <button
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-[#57534E] hover:text-[#1C1917] cursor-pointer"
            aria-label="Close installation guide"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-[#44403C] leading-relaxed">
          Install the Apex Koncepts Studio Web App directly onto your iPhone, iPad, or Android home screen for full-screen standalone access, offline service specification browsing, and instant GHS / USD / EUR scope estimation.
        </p>

        {isInstalled && (
          <div className="p-4 bg-[#F4EFEA] border border-[#15803D] text-xs text-[#15803D] flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Apex Koncepts is already installed on your device in standalone mode.</span>
          </div>
        )}

        {isInstallable && (
          <button
            onClick={install}
            className="w-full min-h-[48px] px-5 py-3 bg-[#C2410C] hover:bg-[#9A3412] text-[#FBF9F5] text-xs font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>Install Native Web App Now (One-Tap)</span>
          </button>
        )}

        {/* Platform Switcher */}
        <div className="grid grid-cols-2 gap-2 bg-[#F4EFEA] p-1.5 border border-[#E5DFD5]">
          <button
            type="button"
            onClick={() => setActiveDeviceTab('ios')}
            className={`min-h-[44px] px-3 py-2 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              activeDeviceTab === 'ios'
                ? 'bg-[#1C1917] text-[#FBF9F5]'
                : 'text-[#57534E] hover:text-[#1C1917]'
            }`}
          >
            Apple iOS (iPhone / iPad)
          </button>
          <button
            type="button"
            onClick={() => setActiveDeviceTab('android')}
            className={`min-h-[44px] px-3 py-2 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              activeDeviceTab === 'android'
                ? 'bg-[#1C1917] text-[#FBF9F5]'
                : 'text-[#57534E] hover:text-[#1C1917]'
            }`}
          >
            Android (Chrome / Samsung)
          </button>
        </div>

        {activeDeviceTab === 'ios' ? (
          <div className="p-5 bg-[#F4EFEA] border border-[#E5DFD5] space-y-4 text-xs text-[#1C1917]">
            <div className="font-semibold uppercase tracking-wider text-[#C2410C] font-mono-num">
              iOS Safari Installation Steps
            </div>
            <ol className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="font-mono-num font-bold text-[#C2410C]">01.</span>
                <span>
                  Open <strong>Apex Koncepts</strong> in Safari on your iPhone or iPad and tap the{' '}
                  <strong className="inline-flex items-center gap-1">
                    <Share className="w-3.5 h-3.5 inline text-[#C2410C]" /> Share
                  </strong>{' '}
                  icon on the bottom navigation bar.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-mono-num font-bold text-[#C2410C]">02.</span>
                <span>
                  Scroll down the share sheet and select{' '}
                  <strong className="inline-flex items-center gap-1">
                    <PlusSquare className="w-3.5 h-3.5 inline text-[#C2410C]" /> Add to Home Screen
                  </strong>.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-mono-num font-bold text-[#C2410C]">03.</span>
                <span>
                  Tap <strong>Add</strong> in the top-right corner. The Apex Koncepts studio icon will appear on your iOS home screen and launch full-screen without browser bars.
                </span>
              </li>
            </ol>
          </div>
        ) : (
          <div className="p-5 bg-[#F4EFEA] border border-[#E5DFD5] space-y-4 text-xs text-[#1C1917]">
            <div className="font-semibold uppercase tracking-wider text-[#C2410C] font-mono-num">
              Android Chrome & Edge Installation Steps
            </div>
            <ol className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="font-mono-num font-bold text-[#C2410C]">01.</span>
                <span>
                  Tap the <strong>One-Tap Install</strong> button above if visible, or tap the browser menu (<strong>⋮</strong>) in the top-right corner of Chrome.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-mono-num font-bold text-[#C2410C]">02.</span>
                <span>
                  Select <strong>Install App</strong> or <strong>Add to Home Screen</strong> from the menu.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-mono-num font-bold text-[#C2410C]">03.</span>
                <span>
                  Confirm installation to add the standalone Apex Koncepts app to your Android app drawer with full offline caching.
                </span>
              </li>
            </ol>
          </div>
        )}

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] px-5 py-2 text-xs font-medium bg-[#1C1917] text-[#FBF9F5] hover:bg-[#292524] transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();
  if (isOnline) return null;

  return (
    <div className="fixed bottom-20 md:bottom-4 left-4 z-50 flex items-center gap-2 bg-[#1C1917] border border-[#C2410C] px-4 py-2.5 text-xs font-medium text-[#FBF9F5] shadow-lg">
      <span>Offline Mode — Browsing cached Apex Koncepts studio specifications & estimator.</span>
    </div>
  );
};
