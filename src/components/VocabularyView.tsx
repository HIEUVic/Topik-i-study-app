import React, { useState, useEffect, useMemo } from 'react';
import { 
  Volume2, 
  RotateCw, 
  Check, 
  AlertCircle, 
  Search, 
  Layers, 
  ListFilter, 
  Shuffle, 
  ChevronLeft, 
  ChevronRight,
  BookA,
  Sparkles,
  HelpCircle,
  Tag
} from 'lucide-react';
import { VocabWord, VocabTopic, VocabStatus, UserProgress } from '../types';
import { VOCABULARY_DATA, VOCAB_TOPICS } from '../data/vocabularyData';
import { speakKorean } from '../utils/audio';

interface VocabularyViewProps {
  progress: UserProgress;
  onUpdateProgress: (updated: UserProgress) => void;
}

export const VocabularyView: React.FC<VocabularyViewProps> = ({
  progress,
  onUpdateProgress
}) => {
  const [viewMode, setViewMode] = useState<'flashcard' | 'list'>('flashcard');
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Flashcard specific states
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Filter words
  const filteredWords = useMemo(() => {
    return VOCABULARY_DATA.filter((word) => {
      // Topic match
      if (selectedTopic !== 'all' && word.topic !== selectedTopic) return false;

      // Status match
      const status = progress.vocabStatus[word.id] || 'unlearned';
      const isReviewDue = progress.vocabReviewDue.includes(word.id);

      if (selectedStatus === 'mastered' && status !== 'mastered') return false;
      if (selectedStatus === 'learning' && status !== 'learning') return false;
      if (selectedStatus === 'unlearned' && status !== 'unlearned') return false;
      if (selectedStatus === 'review_due' && !isReviewDue) return false;

      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchKorean = word.korean.toLowerCase().includes(q);
        const matchViet = word.vietnamese.toLowerCase().includes(q);
        const matchPronun = word.pronunciation?.toLowerCase().includes(q);
        if (!matchKorean && !matchViet && !matchPronun) return false;
      }

      return true;
    });
  }, [selectedTopic, selectedStatus, searchQuery, progress.vocabStatus, progress.vocabReviewDue]);

  // Reset card index if out of bounds
  useEffect(() => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
  }, [selectedTopic, selectedStatus, searchQuery]);

  const currentWord: VocabWord | undefined = filteredWords[currentCardIndex];

  // Handle Audio Pronunciation
  const handlePlayAudio = (text: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsSpeaking(true);
    speakKorean(text, {
      rate: 0.85,
      onEnd: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false)
    });
  };

  // Update word status
  const handleSetWordStatus = (wordId: string, status: VocabStatus, needsReview: boolean = false) => {
    const updatedStatus = { ...progress.vocabStatus, [wordId]: status };
    let updatedReviewDue = [...progress.vocabReviewDue];

    if (needsReview) {
      if (!updatedReviewDue.includes(wordId)) {
        updatedReviewDue.push(wordId);
      }
    } else {
      updatedReviewDue = updatedReviewDue.filter(id => id !== wordId);
    }

    onUpdateProgress({
      ...progress,
      vocabStatus: updatedStatus,
      vocabReviewDue: updatedReviewDue
    });

    // Advance to next card if in flashcard mode
    if (viewMode === 'flashcard' && currentCardIndex < filteredWords.length - 1) {
      setIsFlipped(false);
      setTimeout(() => {
        setCurrentCardIndex(prev => prev + 1);
      }, 150);
    }
  };

  // Keyboard navigation for flashcard
  useEffect(() => {
    if (viewMode !== 'flashcard') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        setIsFlipped(prev => !prev);
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        if (currentCardIndex < filteredWords.length - 1) {
          setIsFlipped(false);
          setCurrentCardIndex(i => i + 1);
        }
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        if (currentCardIndex > 0) {
          setIsFlipped(false);
          setCurrentCardIndex(i => i - 1);
        }
      } else if (e.key === '1' && currentWord) {
        handleSetWordStatus(currentWord.id, 'learning', true);
      } else if (e.key === '2' && currentWord) {
        handleSetWordStatus(currentWord.id, 'mastered', false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode, currentCardIndex, filteredWords.length, currentWord]);

  return (
    <div className="space-y-6">
      {/* Top Controls & Statistics Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold text-slate-900">
                Từ Vựng TOPIK I Sơ Cấp
              </h1>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-indigo-50 text-indigo-700">
                {VOCABULARY_DATA.length} từ đã chọn lọc
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Có phát âm tiếng Hàn giọng chuẩn, câu ví dụ thực tế và chế độ lật Flashcard ghi nhớ nhanh.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl self-start md:self-auto">
            <button
              type="button"
              onClick={() => setViewMode('flashcard')}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                viewMode === 'flashcard'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Chế độ Flashcard</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                viewMode === 'list'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ListFilter className="w-4 h-4" />
              <span>Danh sách từ</span>
            </button>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3 pt-4 border-t border-slate-100">
          {/* Search input */}
          <div className="relative sm:col-span-2 lg:col-span-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Tìm từ tiếng Hàn hoặc tiếng Việt..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-indigo-500"
            />
          </div>

          {/* Topic Select */}
          <div>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full py-1.5 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white text-slate-700 font-medium"
            >
              <option value="all">Tất cả chủ đề ({VOCABULARY_DATA.length})</option>
              {VOCAB_TOPICS.map(t => (
                <option key={t.id} value={t.id}>
                  {t.icon} {t.label}
                </option>
              ))}
            </select>
          </div>

          {/* Status Select */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full py-1.5 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white text-slate-700 font-medium"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="mastered">Đã thuộc ({Object.values(progress.vocabStatus).filter(s => s === 'mastered').length})</option>
              <option value="learning">Đang học ({Object.values(progress.vocabStatus).filter(s => s === 'learning').length})</option>
              <option value="review_due">Cần ôn tập ({progress.vocabReviewDue.length})</option>
              <option value="unlearned">Chưa học</option>
            </select>
          </div>

          {/* Reset Filters */}
          <div className="flex items-center space-x-2">
            {(selectedTopic !== 'all' || selectedStatus !== 'all' || searchQuery) && (
              <button
                type="button"
                onClick={() => {
                  setSelectedTopic('all');
                  setSelectedStatus('all');
                  setSearchQuery('');
                }}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-medium underline"
              >
                Xóa bộ lọc
              </button>
            )}
            <span className="text-xs text-slate-400 ml-auto">
              Tìm thấy: {filteredWords.length} từ
            </span>
          </div>
        </div>
      </div>

      {/* FLASHCARD MODE */}
      {viewMode === 'flashcard' && (
        <div className="max-w-xl mx-auto space-y-4">
          {filteredWords.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
              <BookA className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800">Không tìm thấy từ vựng phù hợp</h3>
              <p className="text-xs text-slate-500 mt-1">Hãy thử xóa bộ lọc tìm kiếm hoặc chọn chủ đề khác.</p>
              <button
                type="button"
                onClick={() => {
                  setSelectedTopic('all');
                  setSelectedStatus('all');
                  setSearchQuery('');
                }}
                className="mt-4 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-xl text-xs font-semibold"
              >
                Xem tất cả từ vựng
              </button>
            </div>
          ) : currentWord && (
            <>
              {/* Card Header & Controls */}
              <div className="flex items-center justify-between text-xs text-slate-500 px-2">
                <span className="font-semibold text-slate-700">
                  Thẻ {currentCardIndex + 1} / {filteredWords.length}
                </span>

                <div className="flex items-center space-x-2">
                  <span className="text-[11px] bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full font-medium">
                    {currentWord.partOfSpeech}
                  </span>
                  {progress.vocabStatus[currentWord.id] === 'mastered' && (
                    <span className="text-[11px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-semibold">
                      Đã thuộc
                    </span>
                  )}
                  {progress.vocabReviewDue.includes(currentWord.id) && (
                    <span className="text-[11px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-semibold">
                      Cần ôn tập
                    </span>
                  )}
                </div>
              </div>

              {/* The 3D Flip Card Container */}
              <div 
                className="relative min-h-[340px] sm:min-h-[380px] w-full rounded-2xl bg-white border-2 border-slate-200/90 shadow-sm cursor-pointer p-6 sm:p-8 flex flex-col justify-between transition-all hover:border-indigo-300 group select-none"
                onClick={() => setIsFlipped(!isFlipped)}
              >
                {/* Flip indicator icon on top right */}
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-medium text-slate-400">
                    {isFlipped ? 'Mặt sau (Nghĩa tiếng Việt & Ví dụ)' : 'Mặt trước (Nhấn để lật xem nghĩa)'}
                  </span>
                  <div className="flex items-center space-x-1 text-slate-400 group-hover:text-indigo-600 transition">
                    <RotateCw className="w-4 h-4" />
                    <span className="text-[11px] hidden sm:inline">Lật thẻ (Phím cách)</span>
                  </div>
                </div>

                {/* Card Front Content (Korean Word Focus) */}
                {!isFlipped ? (
                  <div className="my-auto text-center py-6 space-y-4">
                    <div className="inline-flex items-center justify-center space-x-3">
                      <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 font-korean tracking-wide">
                        {currentWord.korean}
                      </h2>
                      <button
                        type="button"
                        onClick={(e) => handlePlayAudio(currentWord.korean, e)}
                        className={`p-3 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 hover:scale-105 transition shadow-xs ${
                          isSpeaking ? 'ring-2 ring-indigo-400 ring-offset-2 animate-pulse' : ''
                        }`}
                        title="Nghe phát âm chuẩn tiếng Hàn"
                      >
                        <Volume2 className="w-6 h-6" />
                      </button>
                    </div>

                    {currentWord.pronunciation && (
                      <p className="text-sm font-medium text-slate-400 font-mono">
                        [{currentWord.pronunciation}]
                      </p>
                    )}

                    <div className="pt-2">
                      <span className="text-xs text-indigo-600/80 font-medium">
                        Bấm vào thẻ hoặc phím Cách để xem nghĩa tiếng Việt & câu ví dụ
                      </span>
                    </div>
                  </div>
                ) : (
                  /* Card Back Content (Vietnamese & Context) */
                  <div className="my-auto py-2 space-y-4 text-left">
                    <div>
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Ý nghĩa</span>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-indigo-900 mt-0.5">
                        {currentWord.vietnamese}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs font-bold text-slate-700 font-korean">{currentWord.korean}</span>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs text-slate-500">{currentWord.partOfSpeech}</span>
                      </div>
                    </div>

                    {/* Example Sentence Box */}
                    <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-100 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-indigo-800">Câu ví dụ TOPIK:</span>
                        <button
                          type="button"
                          onClick={(e) => handlePlayAudio(currentWord.exampleKorean, e)}
                          className="flex items-center space-x-1 text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                          title="Phát âm câu ví dụ"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>Nghe câu</span>
                        </button>
                      </div>
                      <p className="font-korean text-sm font-bold text-slate-900 leading-relaxed">
                        {currentWord.exampleKorean}
                      </p>
                      <p className="text-xs text-slate-600 italic">
                        &rarr; {currentWord.exampleVietnamese}
                      </p>
                    </div>

                    {currentWord.notes && (
                      <div className="text-xs text-slate-500 bg-amber-50/80 border border-amber-200/80 p-2.5 rounded-lg">
                        <strong className="text-amber-800 font-semibold">Ghi chú:</strong> {currentWord.notes}
                      </div>
                    )}
                  </div>
                )}

                {/* Card Footer: Action Buttons */}
                <div 
                  className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={() => handleSetWordStatus(currentWord.id, 'learning', true)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold border border-amber-200 transition flex items-center justify-center space-x-1.5 shadow-2xs"
                  >
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    <span>Cần ôn tập (Phím 1)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSetWordStatus(currentWord.id, 'mastered', false)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 transition flex items-center justify-center space-x-1.5 shadow-2xs"
                  >
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Đã thuộc (Phím 2)</span>
                  </button>
                </div>
              </div>

              {/* Navigation Arrows for Card */}
              <div className="flex items-center justify-between px-2 pt-1">
                <button
                  type="button"
                  disabled={currentCardIndex === 0}
                  onClick={() => {
                    setIsFlipped(false);
                    setCurrentCardIndex(i => Math.max(0, i - 1));
                  }}
                  className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none shadow-2xs"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Từ trước</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsFlipped(false);
                    const rand = Math.floor(Math.random() * filteredWords.length);
                    setCurrentCardIndex(rand);
                  }}
                  className="flex items-center space-x-1 px-3 py-2 rounded-xl text-xs font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                  title="Xáo trộn ngẫu nhiên"
                >
                  <Shuffle className="w-4 h-4" />
                  <span className="hidden sm:inline">Xáo ngẫu nhiên</span>
                </button>

                <button
                  type="button"
                  disabled={currentCardIndex >= filteredWords.length - 1}
                  onClick={() => {
                    setIsFlipped(false);
                    setCurrentCardIndex(i => Math.min(filteredWords.length - 1, i + 1));
                  }}
                  className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-40 disabled:pointer-events-none shadow-xs"
                >
                  <span>Từ tiếp theo</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* LIST / TABLE MODE */}
      {viewMode === 'list' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Từ vựng (Hangul)</th>
                  <th className="py-3 px-4">Ý nghĩa tiếng Việt</th>
                  <th className="py-3 px-4">Từ loại</th>
                  <th className="py-3 px-4">Câu ví dụ thực tế</th>
                  <th className="py-3 px-4 text-center">Trạng thái</th>
                  <th className="py-3 px-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredWords.map((word) => {
                  const status = progress.vocabStatus[word.id] || 'unlearned';
                  const isReviewDue = progress.vocabReviewDue.includes(word.id);

                  return (
                    <tr key={word.id} className="hover:bg-slate-50/80 transition">
                      {/* Korean & Audio */}
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <button
                            type="button"
                            onClick={() => handlePlayAudio(word.korean)}
                            className="p-1 rounded-full text-indigo-600 hover:bg-indigo-50 transition"
                            title="Nghe phát âm"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                          <div>
                            <span className="font-korean font-bold text-sm text-slate-900">
                              {word.korean}
                            </span>
                            {word.pronunciation && (
                              <div className="text-[10px] text-slate-400 font-mono">
                                [{word.pronunciation}]
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Vietnamese */}
                      <td className="py-3 px-4 font-semibold text-slate-800">
                        {word.vietnamese}
                      </td>

                      {/* Part of speech */}
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px] font-medium">
                          {word.partOfSpeech}
                        </span>
                      </td>

                      {/* Example sentence */}
                      <td className="py-3 px-4 max-w-xs">
                        <div className="font-korean font-medium text-slate-800">
                          {word.exampleKorean}
                        </div>
                        <div className="text-[11px] text-slate-500 italic mt-0.5">
                          {word.exampleVietnamese}
                        </div>
                      </td>

                      {/* Status badge */}
                      <td className="py-3 px-4 text-center">
                        {isReviewDue ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                            Cần ôn lại
                          </span>
                        ) : status === 'mastered' ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            Đã thuộc
                          </span>
                        ) : status === 'learning' ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                            Đang học
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500">
                            Chưa học
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="inline-flex items-center space-x-1">
                          <button
                            type="button"
                            onClick={() => handleSetWordStatus(word.id, 'mastered', false)}
                            className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition"
                            title="Đánh dấu đã thuộc"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSetWordStatus(word.id, 'learning', true)}
                            className="p-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 transition"
                            title="Đánh dấu cần ôn tập"
                          >
                            <AlertCircle className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
