import React, { useState } from "react";
import { X, BookOpen, Layers, CheckCircle, ExternalLink, Calendar, Search, Sparkles } from "lucide-react";
import { PedagogicalFiche } from "../types";
import { SAMPLE_FICHES_COLLECTION } from "../data/sampleFichesCollection";

interface PrebuiltFichesGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFiche: (fiche: PedagogicalFiche) => void;
}

export const PrebuiltFichesGalleryModal: React.FC<PrebuiltFichesGalleryModalProps> = ({
  isOpen,
  onClose,
  onSelectFiche,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSubject, setFilterSubject] = useState<string>("all");

  if (!isOpen) return null;

  const subjectsList = Array.from(
    new Set(SAMPLE_FICHES_COLLECTION.map((f) => f.header.subject))
  );

  const filteredFiches = SAMPLE_FICHES_COLLECTION.filter((f) => {
    const matchesSearch =
      f.header.resourceTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.header.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.header.sequence.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.header.field.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSubject =
      filterSubject === "all" || f.header.subject === filterSubject;

    return matchesSearch && matchesSubject;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-blue-50/80 via-indigo-50/50 to-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-['Amiri',serif]">
                بنك النماذج التطبيقية الجاهزة (مكتملة الأنشطة والأمثلة)
              </h3>
              <p className="text-xs text-slate-500">
                مذكرات بيداغوجية نموذجية ومفصلة في مختلف المواد (علوم، فيزياء، رياضيات، لغة عربية، تاريخ، تربية إسلامية ومدنية، فرنسية، إنجليزية)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-3 bg-white">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
            <input
              type="text"
              placeholder="ابحث بالدرس أو المادة أو المقطع التعلمي..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-9 pl-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            />
          </div>
          <select
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium cursor-pointer"
          >
            <option value="all">جميع المواد ({SAMPLE_FICHES_COLLECTION.length} مذكرات)</option>
            {subjectsList.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </div>

        {/* Cards Grid */}
        <div className="p-4 sm:p-5 flex-1 overflow-y-auto bg-slate-50/50 space-y-3">
          {filteredFiches.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <BookOpen className="w-12 h-12 mx-auto mb-2 text-slate-300" />
              <p className="text-sm font-semibold text-slate-600">لا توجد مذكرات مطابقة للبحث</p>
            </div>
          ) : (
            filteredFiches.map((fiche) => {
              const isFr = fiche.header.language === "fr";
              const isEn = fiche.header.language === "en";

              return (
                <div
                  key={fiche.id}
                  className="bg-white border border-slate-200 hover:border-blue-300 rounded-xl p-4 shadow-2xs hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold px-2.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-100 rounded-md">
                        {fiche.header.subject}
                      </span>
                      <span className="text-xs font-medium px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md">
                        {fiche.header.level}
                      </span>
                      <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        مكتملة ومفصلة
                      </span>
                    </div>

                    <h4 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {fiche.header.resourceTitle}
                    </h4>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                      <span>{fiche.header.sequence}</span>
                      <span>•</span>
                      <span>{fiche.header.duration}</span>
                      <span>•</span>
                      <span>{fiche.steps.length} مراحل بيداغوجية</span>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 bg-slate-50 p-2 rounded-lg border border-slate-100 mt-1">
                      <strong className="text-slate-700">المورد السبوري: </strong>
                      {fiche.boardSummary.title}
                    </p>
                  </div>

                  <div className="flex sm:flex-col items-center justify-end gap-2 shrink-0">
                    <button
                      onClick={() => {
                        onSelectFiche(fiche);
                        onClose();
                      }}
                      className="w-full sm:w-auto px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4" />
                      فتح واستعراض المذكرة
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-100 bg-white flex items-center justify-between px-5">
          <span className="text-xs text-slate-500">
            يتضمن بنك النماذج {SAMPLE_FICHES_COLLECTION.length} مذكرات حقيقية شاملة ومطابقة لمنهاج الجيل الثاني.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
