"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Eye,
  Type,
  Palette,
  Hand,
  Keyboard,
  Volume2,
  FileText,
} from "lucide-react";

interface AccessibilitySettings {
  fontSize: number;
  contrast: "normal" | "high" | "inverted";
  underlineLinks: boolean;
  highlightLinks: boolean;
  bigCursor: boolean;
  readingGuide: boolean;
  stopAnimations: boolean;
  readableFont: boolean;
  keyboardNav: boolean;
  screenReader: boolean;
}

const AccessibilityWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>({
    fontSize: 100,
    contrast: "normal",
    underlineLinks: false,
    highlightLinks: false,
    bigCursor: false,
    readingGuide: false,
    stopAnimations: false,
    readableFont: false,
    keyboardNav: true,
    screenReader: false,
  });
  const [readingGuideY, setReadingGuideY] = useState(0);

  // Load settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem("accessibilitySettings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  // Apply settings
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    // Font size
    root.style.fontSize = `${settings.fontSize}%`;

    // Contrast
    root.classList.remove("high-contrast", "inverted-contrast");
    if (settings.contrast === "high") {
      root.classList.add("high-contrast");
    } else if (settings.contrast === "inverted") {
      root.classList.add("inverted-contrast");
    }

    // Links
    root.classList.toggle("underline-links", settings.underlineLinks);
    root.classList.toggle("highlight-links", settings.highlightLinks);

    // Cursor
    root.classList.toggle("big-cursor", settings.bigCursor);

    // Animations
    root.classList.toggle("stop-animations", settings.stopAnimations);

    // Readable font
    root.classList.toggle("readable-font", settings.readableFont);

    // Save to localStorage
    localStorage.setItem("accessibilitySettings", JSON.stringify(settings));
  }, [settings]);

  // Reading guide
  useEffect(() => {
    if (settings.readingGuide) {
      const handleMouseMove = (e: MouseEvent) => {
        setReadingGuideY(e.clientY);
      };
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [settings.readingGuide]);

  const resetSettings = () => {
    setSettings({
      fontSize: 100,
      contrast: "normal",
      underlineLinks: false,
      highlightLinks: false,
      bigCursor: false,
      readingGuide: false,
      stopAnimations: false,
      readableFont: false,
      keyboardNav: true,
      screenReader: false,
    });
  };

  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <>
      {/* Accessibility Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed left-0 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-3 rounded-r-lg shadow-lg hover:bg-blue-700 transition-colors z-[9999] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label="פתח תפריט נגישות"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2M21 9H15L13.5 7.5C13 6.9 12.3 6.5 11.5 6.5H7.9L9.2 9.2C9.3 9.6 9.1 10 8.8 10.2L7 11.8L10.4 20C10.6 20.6 11.1 21 11.7 21H11.8C12.6 21 13.2 20.4 13.2 19.7L13 15H16C16.5 15 17 14.5 17 14V11C17 10.4 17.6 10 18.2 10H21C21.6 10 22 9.6 22 9C22 8.4 21.6 8 21 8M8.5 15.5L5.8 11.6C5.6 11.3 5.5 11 5.5 10.7C5.5 10.2 5.7 9.8 6 9.5L9 6.5L8.5 5H3C2.4 5 2 5.4 2 6C2 6.6 2.4 7 3 7H6L4.5 9.5C3.6 10.9 3.8 12.8 4.9 14L7.6 17.5C8 18 8.5 18.2 9 18.2C9.8 18.2 10.5 17.6 10.5 16.8C10.5 16.4 10.3 16 10 15.7L8.5 15.5Z" />
        </svg>
      </button>

      {/* Widget Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[10000] flex justify-end mt-20"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white w-full max-w-md h-full overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="תפריט נגישות"
            dir="rtl"
          >
            {/* Header */}
            <div className="bg-blue-600 text-white p-4 flex justify-between items-center sticky top-0 z-10">
              <h2 className="text-xl font-bold">הגדרות נגישות</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-blue-700 rounded transition-colors"
                aria-label="סגור תפריט נגישות"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-6">
              {/* Font Size */}
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Type className="w-5 h-5" />
                  גודל טקסט
                </h3>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() =>
                      updateSetting(
                        "fontSize",
                        Math.max(80, settings.fontSize - 10)
                      )
                    }
                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                    aria-label="הקטן טקסט"
                  >
                    א-
                  </button>
                  <span className="flex-1 text-center">
                    {settings.fontSize}%
                  </span>
                  <button
                    onClick={() =>
                      updateSetting(
                        "fontSize",
                        Math.min(150, settings.fontSize + 10)
                      )
                    }
                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                    aria-label="הגדל טקסט"
                  >
                    א+
                  </button>
                </div>
              </div>

              {/* Contrast */}
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  ניגודיות
                </h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="contrast"
                      checked={settings.contrast === "normal"}
                      onChange={() => updateSetting("contrast", "normal")}
                      className="w-4 h-4"
                    />
                    <span>רגיל</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="contrast"
                      checked={settings.contrast === "high"}
                      onChange={() => updateSetting("contrast", "high")}
                      className="w-4 h-4"
                    />
                    <span>ניגודיות גבוהה</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="contrast"
                      checked={settings.contrast === "inverted"}
                      onChange={() => updateSetting("contrast", "inverted")}
                      className="w-4 h-4"
                    />
                    <span>היפוך צבעים</span>
                  </label>
                </div>
              </div>

              {/* Links */}
              <div className="space-y-2">
                <h3 className="font-semibold">קישורים</h3>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.underlineLinks}
                    onChange={(e) =>
                      updateSetting("underlineLinks", e.target.checked)
                    }
                    className="w-4 h-4"
                  />
                  <span>הדגש קישורים</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.highlightLinks}
                    onChange={(e) =>
                      updateSetting("highlightLinks", e.target.checked)
                    }
                    className="w-4 h-4"
                  />
                  <span>הבלט קישורים</span>
                </label>
              </div>

              {/* Cursor */}
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Hand className="w-5 h-5" />
                  סמן
                </h3>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.bigCursor}
                    onChange={(e) =>
                      updateSetting("bigCursor", e.target.checked)
                    }
                    className="w-4 h-4"
                  />
                  <span>סמן גדול</span>
                </label>
              </div>

              {/* Reading */}
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  קריאה
                </h3>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.readingGuide}
                    onChange={(e) =>
                      updateSetting("readingGuide", e.target.checked)
                    }
                    className="w-4 h-4"
                  />
                  <span>סרגל קריאה</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.readableFont}
                    onChange={(e) =>
                      updateSetting("readableFont", e.target.checked)
                    }
                    className="w-4 h-4"
                  />
                  <span>גופן קריא</span>
                </label>
              </div>

              {/* Animations */}
              <div className="space-y-2">
                <h3 className="font-semibold">אנימציות</h3>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.stopAnimations}
                    onChange={(e) =>
                      updateSetting("stopAnimations", e.target.checked)
                    }
                    className="w-4 h-4"
                  />
                  <span>עצור אנימציות</span>
                </label>
              </div>

              {/* Navigation */}
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Keyboard className="w-5 h-5" />
                  ניווט
                </h3>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.keyboardNav}
                    onChange={(e) =>
                      updateSetting("keyboardNav", e.target.checked)
                    }
                    className="w-4 h-4"
                  />
                  <span>ניווט מקלדת</span>
                </label>
              </div>

              {/* Screen Reader */}
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Volume2 className="w-5 h-5" />
                  קורא מסך
                </h3>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.screenReader}
                    onChange={(e) =>
                      updateSetting("screenReader", e.target.checked)
                    }
                    className="w-4 h-4"
                  />
                  <span>מותאם לקורא מסך</span>
                </label>
              </div>

              {/* Reset Button */}
              <button
                onClick={resetSettings}
                className="w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded transition-colors font-medium"
              >
                איפוס הגדרות
              </button>

              {/* Accessibility Statement */}
              <a
                href="/accessibility-statement"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
              >
                <FileText className="w-5 h-5" />
                הצהרת נגישות
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Reading Guide */}
      {settings.readingGuide && (
        <div
          className="fixed left-0 right-0 h-20 bg-black bg-opacity-20 pointer-events-none z-[9998]"
          style={{ top: `${readingGuideY - 40}px` }}
        />
      )}

      {/* Global Styles */}
      <style jsx global>{`
        /* High Contrast */
        .high-contrast {
          filter: contrast(1.5);
        }

        .high-contrast * {
          background-color: white !important;
          color: black !important;
          border-color: black !important;
        }

        .high-contrast a {
          color: blue !important;
          text-decoration: underline !important;
        }

        .high-contrast button {
          background-color: black !important;
          color: white !important;
          border: 2px solid white !important;
        }

        /* Inverted Contrast */
        .inverted-contrast {
          filter: invert(1) hue-rotate(180deg);
        }

        .inverted-contrast img,
        .inverted-contrast video {
          filter: invert(1) hue-rotate(180deg);
        }

        /* Underline Links */
        .underline-links a {
          text-decoration: underline !important;
        }

        /* Highlight Links */
        .highlight-links a {
          background-color: yellow !important;
          color: black !important;
          padding: 2px 4px;
        }

        /* Big Cursor */
        .big-cursor,
        .big-cursor * {
          cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewport="0 0 48 48" style="fill:black;stroke:white;stroke-width:2px;"><path d="M10 10 L38 24 L24 24 L24 38 Z"/></svg>')
              10 10,
            auto !important;
        }

        /* Stop Animations */
        .stop-animations *,
        .stop-animations *::before,
        .stop-animations *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }

        /* Readable Font */
        .readable-font * {
          font-family: Arial, Helvetica, sans-serif !important;
          line-height: 1.5 !important;
          letter-spacing: 0.12em !important;
          word-spacing: 0.16em !important;
        }

        /* Focus Styles */
        *:focus {
          outline: 3px solid #4a90e2 !important;
          outline-offset: 2px !important;
        }

        /* Skip Links */
        .skip-link {
          position: absolute;
          top: -40px;
          left: 0;
          background: #000;
          color: #fff;
          padding: 8px;
          text-decoration: none;
          z-index: 100000;
        }

        .skip-link:focus {
          top: 0;
        }
      `}</style>
    </>
  );
};

export default AccessibilityWidget;
