import React, { useState, useEffect } from 'react';
import { 
  Headphones, 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  XCircle, 
  Gauge, 
  Sparkles,
  Info
} from 'lucide-react';
import { PracticeQuestion, UserProgress } from '../types';
import { PRACTICE_QUESTIONS } from '../data/practiceData';
import { speakKorean, stopSpeaking, isSpeechSynthesisSupported } from '../utils/audio';
import { recordErrorItem, removeErrorItem } from '../utils/storage';

interface ListeningViewProps {
  progress: UserProgress;
  onUpdateProgress: (updated: UserProgress) => void;
}

export const ListeningView: React.FC<ListeningViewProps> = ({
  progress,
  onUpdateProgress
}) => {
  const listeningQuestions = PRACTICE_QUESTIONS.filter(q => q.type === 'listening');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(0.85); // slower for beginner
  const [showTranscript, setShowTranscript] = useState<boolean>(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number | null>>({});
  const [submittedStatus, setSubmittedStatus] = useState<Record<string, boolean>>({});
  const [audioAvailable, setAudioAvailable] = useState<boolean>(true);

  useEffect(() => {
    setAudioAvailable(isSpeechSynthesisSupported());
  }, []);

  const currentQ = listeningQuestions[currentIndex];

  const handlePlayAudio = () => {
    if (!currentQ?.audioScript) return;

    if (isPlaying) {
      stopSpeaking();
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
    const success = speakKorean(currentQ.audioScript, {
      rate: playbackSpeed,
      onEnd: () => setIsPlaying(false),
      onError: () => setIsPlaying(false)
    });

    if (!success) {
      setIsPlaying(false);
    }
  };

  const handleSelectOption = (idx: number) => {
    if (submittedStatus[currentQ.id]) return;
    setSelectedAnswers(prev => ({ ...prev, [currentQ.id]: idx }));
  };

  const handleSubmitAnswer = () => {
    const selectedIdx = selectedAnswers[currentQ.id];
    if (selectedIdx === undefined || selectedIdx === null) return;

    const isCorrect = selectedIdx === currentQ.correctAnswer;
    setSubmittedStatus(prev => ({ ...prev, [currentQ.id]: true }));

    let updatedProgress = { ...progress };
    updatedProgress.completedPracticeIds = {
      ...updatedProgress.completedPracticeIds,
      [currentQ.id]: isCorrect
    };

    if (isCorrect) {
      updatedProgress = removeErrorItem(currentQ.id, updatedProgress);
    } else {
      updatedProgress = recordErrorItem({
        id: currentQ.id,
        type: 'listening',
        questionTitle: currentQ.category,
        questionPrompt: `${currentQ.question}\n(Lời thoại: ${currentQ.audioScript})`,
        userAnswerIndex: selectedIdx,
        correctAnswerIndex: currentQ.correctAnswer,
        options: currentQ.options,
        explanation: currentQ.explanation
      }, updatedProgress);
    }

    onUpdateProgress(updatedProgress);
  };

  const handleRetryQuestion = () => {
    setSelectedAnswers(prev => ({ ...prev, [currentQ.id]: null }));
    setSubmittedStatus(prev => ({ ...prev, [currentQ.id]: false }));
  };

  const isSubmitted = submittedStatus[currentQ.id] || progress.completedPracticeIds[currentQ.id] !== undefined;
  const userSelected = selectedAnswers[currentQ.id];
  const isCorrect = isSubmitted && (userSelected === currentQ.correctAnswer || progress.completedPracticeIds[currentQ.id] === true);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 text-xs font-semibold mb-2">
              <Headphones className="w-3.5 h-3.5" />
              <span>Kỹ năng Nghe Hiểu (듣기)</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">
              Luyện Nghe TOPIK I Sơ Cấp
            </h1>
            <p className="mt-1 text-xs text-slate-500 max-w-2xl">
              Thực hành các dạng câu hỏi nghe đặc trưng của TOPIK I: nối câu hội thoại, đoán địa điểm giao dịch và xác định hành động tiếp theo của nhân vật.
            </p>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            {audioAvailable ? (
              <span className="text-xs px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200 flex items-center">
                <Volume2 className="w-4 h-4 mr-1.5" />
                Giọng đọc tiếng Hàn Web Speech
              </span>
            ) : (
              <span className="text-xs px-3 py-1.5 rounded-xl bg-amber-50 text-amber-700 font-semibold border border-amber-200 flex items-center">
                <VolumeX className="w-4 h-4 mr-1.5" />
                Trình duyệt không hỗ trợ Web Speech
              </span>
            )}
          </div>
        </div>

        {/* Question Selector Tabs */}
        <div className="mt-5 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin pt-3 border-t border-slate-100">
          {listeningQuestions.map((q, idx) => {
            const isAnswered = progress.completedPracticeIds[q.id] !== undefined;
            const isRight = progress.completedPracticeIds[q.id] === true;
            const isSelected = currentIndex === idx;

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => {
                  stopSpeaking();
                  setIsPlaying(false);
                  setCurrentIndex(idx);
                }}
                className={`shrink-0 flex items-center space-x-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition border ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span>Câu {idx + 1}</span>
                {isAnswered && (
                  <span className={`w-2 h-2 rounded-full ${isRight ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Question Card */}
      <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-2xs p-6 sm:p-8 space-y-6">
        {/* Category & Status */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
            {currentQ.category}
          </span>

          <span className="text-xs font-semibold text-slate-400">
            Câu {currentIndex + 1} / {listeningQuestions.length}
          </span>
        </div>

        {/* Audio Player Component (Real Web Speech API) */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white space-y-4 shadow-sm">
          <div className="flex items-center justify-between text-xs text-indigo-200">
            <span className="font-semibold flex items-center">
              <Sparkles className="w-3.5 h-3.5 mr-1 text-amber-300" />
              Đoạn hội thoại thực hành ({currentQ.audioSpeaker || 'Hội thoại'})
            </span>
            <span>Tốc độ: {playbackSpeed}x</span>
          </div>

          {/* Audio Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex items-center space-x-3">
              {audioAvailable ? (
                <button
                  type="button"
                  onClick={handlePlayAudio}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-xs transition shadow-xs ${
                    isPlaying
                      ? 'bg-rose-500 text-white animate-pulse'
                      : 'bg-indigo-500 hover:bg-indigo-400 text-white'
                  }`}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                  <span>{isPlaying ? 'Đang phát hội thoại...' : 'Bấm để nghe đoạn thoại'}</span>
                </button>
              ) : (
                <div className="text-xs text-amber-300 bg-amber-900/40 px-3 py-2 rounded-xl border border-amber-500/30">
                  Audio không khả dụng trên trình duyệt này. Hãy đọc lời thoại bên dưới.
                </div>
              )}

              {/* Speed toggle */}
              <div className="flex items-center bg-white/10 rounded-xl p-1 text-xs">
                <button
                  type="button"
                  onClick={() => setPlaybackSpeed(0.85)}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                    playbackSpeed === 0.85 ? 'bg-white text-slate-900' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  0.85x (Chậm)
                </button>
                <button
                  type="button"
                  onClick={() => setPlaybackSpeed(1.0)}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                    playbackSpeed === 1.0 ? 'bg-white text-slate-900' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  1.0x (Chuẩn)
                </button>
              </div>
            </div>

            {/* Transcript Toggle */}
            <button
              type="button"
              onClick={() => setShowTranscript(!showTranscript)}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-slate-200 transition"
            >
              {showTranscript ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>{showTranscript ? 'Ẩn lời thoại' : 'Xem lời thoại (Transcript)'}</span>
            </button>
          </div>

          {/* Transcript Box */}
          {showTranscript && currentQ.audioScript && (
            <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 text-xs space-y-1.5 font-korean">
              <span className="text-[10px] text-indigo-300 font-bold uppercase tracking-wider">Lời thoại Hangul:</span>
              <p className="text-slate-100 whitespace-pre-line leading-relaxed text-sm font-medium">
                {currentQ.audioScript}
              </p>
            </div>
          )}
        </div>

        {/* Question Prompt */}
        <div className="space-y-1">
          <h2 className="text-base sm:text-lg font-bold text-slate-900">
            {currentQ.question}
          </h2>
          {currentQ.passage && (
            <p className="text-xs text-slate-500 italic">
              Ngữ cảnh: {currentQ.passage}
            </p>
          )}
        </div>

        {/* 4 Multiple Choice Options */}
        <div className="space-y-2.5">
          {currentQ.options.map((option, optIdx) => {
            const isChecked = userSelected === optIdx;
            const isTheCorrectAnswer = optIdx === currentQ.correctAnswer;

            let optionStyle = 'border-slate-200 bg-slate-50/50 hover:bg-slate-100 text-slate-800';

            if (isSubmitted) {
              if (isTheCorrectAnswer) {
                optionStyle = 'border-emerald-300 bg-emerald-50 text-emerald-900 font-bold';
              } else if (isChecked && !isCorrect) {
                optionStyle = 'border-rose-300 bg-rose-50 text-rose-900 font-semibold';
              } else {
                optionStyle = 'border-slate-100 bg-slate-50 text-slate-400 opacity-60';
              }
            } else if (isChecked) {
              optionStyle = 'border-indigo-500 bg-indigo-50 text-indigo-900 font-bold';
            }

            return (
              <button
                key={optIdx}
                type="button"
                disabled={isSubmitted}
                onClick={() => handleSelectOption(optIdx)}
                className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition flex items-center space-x-3 ${optionStyle}`}
              >
                <span className="w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold shrink-0">
                  {String.fromCharCode(65 + optIdx)}
                </span>
                <span className="font-korean">{option}</span>
              </button>
            );
          })}
        </div>

        {/* Submit or Explanation Area */}
        {!isSubmitted ? (
          <div className="flex justify-end pt-2">
            <button
              type="button"
              disabled={userSelected === undefined || userSelected === null}
              onClick={handleSubmitAnswer}
              className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-40 disabled:pointer-events-none transition shadow-2xs"
            >
              Nộp bài & Xem giải thích
            </button>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {isCorrect ? (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-md flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-1" />
                    Chính xác!
                  </span>
                ) : (
                  <span className="text-xs font-bold text-rose-700 bg-rose-100 px-2.5 py-1 rounded-md flex items-center">
                    <XCircle className="w-4 h-4 mr-1" />
                    Chưa đúng (Đã tự động lưu vào Sổ tay lỗi sai)
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={handleRetryQuestion}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold flex items-center space-x-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Làm lại câu này</span>
              </button>
            </div>

            <div>
              <span className="text-xs font-bold text-slate-800">Giải thích chi tiết bằng tiếng Việt:</span>
              <p className="text-xs text-slate-600 leading-relaxed mt-1">
                {currentQ.explanation}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
