import { RoadmapWeek } from '../types';

export const ROADMAP_DATA: RoadmapWeek[] = [
  {
    weekNumber: 1,
    title: 'Tuần 1: Nhập môn Hangul & Phát âm chuẩn',
    koreanTheme: '한글과 발음 기초',
    focus: 'Bảng chữ cái, nguyên âm, phụ âm, cấu tạo âm tiết và quy tắc nối âm/patchim',
    description: 'Xây nền móng vững chắc với hệ thống chữ viết tiếng Hàn, cách ghép vần và 7 phát âm đại diện của patchim.',
    objectives: [
      'Nắm vững 19 phụ âm (cơ bản, kép, bật hơi) và 21 nguyên âm (đơn, ghép)',
      'Thành thạo quy tắc ghép âm tiết (ngang, dọc, có patchim)',
      'Phát âm chuẩn 7 âm đại diện của patchim (ㄱ, ㄴ, ㄷ, ㄹ, ㅁ, ㅂ, ㅇ)',
      'Làm quen với quy tắc nối âm (연음) xuất hiện liên tục trong bài nghe TOPIK'
    ],
    lessons: [
      {
        id: 'w1-l1',
        title: 'Bài 1: Nguyên âm và Phụ âm cơ bản',
        summary: 'Học cách đọc, viết nguyên âm đơn (ㅏ, ㅓ, ㅗ, ㅜ...) và phụ âm (ㄱ, ㄴ, ㄷ, ㄹ...).',
        objectives: ['Nhận diện mặt chữ', 'Phát âm chuẩn không nhầm lẫn ㄱ/ㅋ, ㄷ/ㅌ'],
        estimatedMinutes: 60,
        targetTab: 'vocabulary',
        targetId: 'chao-hoi'
      },
      {
        id: 'w1-l2',
        title: 'Bài 2: Nguyên âm ghép & Phụ âm căng/bật hơi',
        summary: 'Các nguyên âm phức tạp hơn (ㅐ, ㅔ, ㅘ, ㅝ, ㅢ) và cặp phụ âm bật hơi ㅋ, ㅌ, ㅍ, ㅊ cùng âm căng ㄲ, ㄸ, ㅃ, ㅆ, ㅉ.',
        objectives: ['Phân biệt âm thường, âm căng và âm bật hơi', 'Nhận diện nguyên âm ghép'],
        estimatedMinutes: 60,
        targetTab: 'vocabulary',
        targetId: 'chao-hoi'
      },
      {
        id: 'w1-l3',
        title: 'Bài 3: Cấu trúc âm tiết & 7 nhóm Patchim',
        summary: 'Cơ chế đóng vần trong tiếng Hàn và cách phát âm chuẩn khi từ có phụ âm dưới.',
        objectives: ['Quy tắc 7 phụ âm cuối đại diện', 'Cách phát âm patchim đôi thường gặp (ㄳ, ㄵ, ㄶ, ㄼ, ㄺ)'],
        estimatedMinutes: 60,
        targetTab: 'vocabulary',
        targetId: 'chao-hoi'
      },
      {
        id: 'w1-l4',
        title: 'Bài 4: Quy tắc nối âm (연음화) trong đề thi',
        summary: 'Khi phụ âm cuối gặp nguyên âm tiếp theo, âm thanh biến đổi thế nào trong câu nói thực tế.',
        objectives: ['Luyện nghe hiện tượng nối âm 한국어 [한구거], 밥을 [바블]', 'Đọc lưu loát các từ ngắn'],
        estimatedMinutes: 60,
        targetTab: 'listening'
      }
    ]
  },
  {
    weekNumber: 2,
    title: 'Tuần 2: Cấu trúc câu cơ bản, Chào hỏi & Số đếm',
    koreanTheme: '기본 문장과 숫자',
    focus: 'Trật tự câu S-O-V, đại từ nhân xưng, tiểu từ 은/는, 이/가, số thuần Hàn và Hán Hàn',
    description: 'Bắt đầu ghép câu hoàn chỉnh, giới thiệu bản thân, đọc giờ giấc, ngày tháng và xưng hô trong gia đình.',
    objectives: [
      'Hiểu rõ trật tự câu tiếng Hàn: Chủ ngữ - Tân ngữ - Vị ngữ',
      'Phân biệt rõ ràng giữa tiểu từ chủ đề 은/는 và tiểu từ chủ ngữ 이/가',
      'Sử dụng thành thạo đuôi câu trang trọng -ㅂ니다/습니다 và thân mật -아/어요',
      'Đọc chính xác số đếm Hán Hàn (ngày, tháng, tiền, số điện thoại) và thuần Hàn (tuổi, giờ, số lượng)'
    ],
    lessons: [
      {
        id: 'w2-l1',
        title: 'Bài 1: Giới thiệu bản thân & Chào hỏi',
        summary: 'Các mẫu câu chào, cảm ơn, xin lỗi và giới thiệu tên, quốc tịch, nghề nghiệp.',
        objectives: ['Sử dụng 입니다/입니까?', 'Học 15 từ vựng nghề nghiệp & quốc gia'],
        estimatedMinutes: 60,
        targetTab: 'grammar',
        targetId: 'g1'
      },
      {
        id: 'w2-l2',
        title: 'Bài 2: Tiểu từ 은/는 và 이/가 chuyên sâu',
        summary: 'Bí quyết không bao giờ nhầm lẫn giữa hai loại tiểu từ quan trọng bậc nhất TOPIK I.',
        objectives: ['Hiểu bản chất nhấn mạnh chủ đề vs chủ ngữ', 'Làm đúng 100% các câu hỏi ngữ pháp liên quan'],
        estimatedMinutes: 60,
        targetTab: 'grammar',
        targetId: 'g1'
      },
      {
        id: 'w2-l3',
        title: 'Bài 3: Đuôi câu hiện tại -아/어요 & -ㅂ니다/습니다',
        summary: 'Quy tắc chia đuôi câu theo nguyên âm kết thúc (dương tính ㅏ, ㅗ vs âm tính ㅓ, ㅜ, ㅣ).',
        objectives: ['Thành thạo chia động từ/tính từ bất quy tắc cơ bản', 'Áp dụng cho đuôi câu giao tiếp'],
        estimatedMinutes: 60,
        targetTab: 'grammar',
        targetId: 'g2'
      },
      {
        id: 'w2-l4',
        title: 'Bài 4: Hệ thống số đếm & Thời gian',
        summary: 'Hệ số Hán Hàn (일, 이, 삼...) và Thuần Hàn (하나, 둘, 셋...), cách hỏi và trả lời ngày giờ, giá tiền.',
        objectives: ['Nói giờ bằng số thuần Hàn + phút bằng số Hán Hàn', 'Đọc giá tiền Won'],
        estimatedMinutes: 60,
        targetTab: 'vocabulary',
        targetId: 'so-dem-thoi-gian'
      }
    ]
  },
  {
    weekNumber: 3,
    title: 'Tuần 3: Sinh hoạt hàng ngày, Món ăn & Mua sắm',
    koreanTheme: '일상생활과 음식',
    focus: 'Tiểu từ tân ngữ 을/를, nơi chốn 에 / 에서, thì quá khứ -았/었어요, thể phủ định',
    description: 'Mở rộng khả năng diễn đạt về các hành động thường ngày, gọi món tại nhà hàng, hỏi giá và mua sắm.',
    objectives: [
      'Phân biệt rõ ràng tiểu từ nơi chốn: 에 (phương hướng/tồn tại) vs 에서 (nơi diễn ra hành động)',
      'Sử dụng đuôi thì quá khứ -았/었어요 để kể lại hoạt động đã làm',
      'Biết cách phủ định câu bằng 안 hoặc đuôi câu -지 않다',
      'Nắm bộ từ vựng món ăn, đơn vị đếm (cái, cốc, bát, người) và mua sắm'
    ],
    lessons: [
      {
        id: 'w3-l1',
        title: 'Bài 1: Tiểu từ tân ngữ 을/를 & Động từ sinh hoạt',
        summary: 'Ghép câu với hành động: đọc sách, ăn cơm, uống nước, xem phim.',
        objectives: ['Nhận biết patchim để chọn 을 hay 를', 'Nhớ 20 động từ sinh hoạt thông dụng'],
        estimatedMinutes: 60,
        targetTab: 'grammar',
        targetId: 'g4'
      },
      {
        id: 'w3-l2',
        title: 'Bài 2: Nơi chốn & Thời gian: Phân biệt 에 và 에서',
        summary: 'Điểm ngữ pháp thường xuyên xuất hiện ở các câu 1-5 bài đọc và bài nghe TOPIK I.',
        objectives: ['Nắm chắc 에 cho thời gian & đích đến (가다, 오다, 있다)', 'Dùng 에서 cho nơi diễn ra hành động'],
        estimatedMinutes: 60,
        targetTab: 'grammar',
        targetId: 'g5'
      },
      {
        id: 'w3-l3',
        title: 'Bài 3: Thì quá khứ -았/었/했어요',
        summary: 'Cách chia quá khứ cho động từ và tính từ, diễn đạt nhật ký ngày hôm qua.',
        objectives: ['Chia chuẩn các động từ kết thúc bằng 하다, ㅏ/ㅗ và các nguyên âm còn lại'],
        estimatedMinutes: 60,
        targetTab: 'grammar',
        targetId: 'g6'
      },
      {
        id: 'w3-l4',
        title: 'Bài 4: Phủ định 안 / -지 않다 & Từ vựng đồ ăn, mua sắm',
        summary: 'Cách nói "tôi không làm...", hỏi giá bao nhiêu (얼마예요?) và gọi món tại nhà hàng.',
        objectives: ['Sử dụng tiền tố 안 và hậu tố -지 않다', 'Hiểu mẫu hội thoại mua sắm'],
        estimatedMinutes: 60,
        targetTab: 'vocabulary',
        targetId: 'do-an-uong'
      }
    ]
  },
  {
    weekNumber: 4,
    title: 'Tuần 4: Giao thông, Thời tiết, Dự định & Khả năng',
    koreanTheme: '교통, 날씨와 계획',
    focus: 'Phương tiện (으)로, thì tương lai -(으)ㄹ 거예요, khả năng -(으)ㄹ 수 있다/없다, liên từ',
    description: 'Diễn tả kế hoạch tương lai, phương tiện đi lại, thời tiết bốn mùa và liên kết câu logic.',
    objectives: [
      'Biểu đạt kế hoạch tương lai với -(으)ㄹ 거예요',
      'Nói về khả năng hoặc không thể làm gì với -(으)ㄹ 수 있다/없다',
      'Sử dụng các liên từ nối câu -고, -지만, -아서/어서',
      'Đọc hiểu biển chỉ dẫn tàu điện ngầm, xe buýt, thông tin thời tiết'
    ],
    lessons: [
      {
        id: 'w4-l1',
        title: 'Bài 1: Phương tiện di chuyển & Tiểu từ (으)로',
        summary: 'Nói về cách đi lại: đi bằng xe buýt, tàu điện ngầm, đi bộ.',
        objectives: ['Cách dùng (으)로 chỉ phương tiện và phương hướng', 'Học từ vựng trạm xe, ga tàu'],
        estimatedMinutes: 60,
        targetTab: 'vocabulary',
        targetId: 'giao-thong-dia-diem'
      },
      {
        id: 'w4-l2',
        title: 'Bài 2: Thì tương lai & Dự định -(으)ㄹ 거예요',
        summary: 'Kể về kế hoạch cuối tuần, chuyến du lịch hoặc dự định kỳ thi.',
        objectives: ['Chia chính xác đuôi -(으)ㄹ 거예요', 'Nhận diện trạng từ tương lai (내일, 다음 주)'],
        estimatedMinutes: 60,
        targetTab: 'grammar',
        targetId: 'g8'
      },
      {
        id: 'w4-l3',
        title: 'Bài 3: Thể hiện khả năng -(으)ㄹ 수 있다/없다 & Mong muốn -고 싶다',
        summary: 'Cách nói "tôi có thể nói tiếng Hàn", "tôi muốn đi du lịch".',
        objectives: ['Cấu trúc khả năng và mong muốn cá nhân', 'Làm quen bài tập chọn câu đồng nghĩa'],
        estimatedMinutes: 60,
        targetTab: 'grammar',
        targetId: 'g9'
      },
      {
        id: 'w4-l4',
        title: 'Bài 4: Các liên từ liên kết câu: -고, -지만, -아서/어서',
        summary: 'Nối hai mệnh đề chỉ sự liệt kê, tương phản và lý do nguyên nhân.',
        objectives: ['Tránh lỗi dùng thì quá khứ trước -아서/어서', 'Dịch trôi chảy câu phức sơ cấp'],
        estimatedMinutes: 60,
        targetTab: 'grammar',
        targetId: 'g10'
      }
    ]
  },
  {
    weekNumber: 5,
    title: 'Tuần 5: Luyện giải dạng đề Nghe & Đọc cơ bản',
    koreanTheme: '듣기·읽기 기본 유형 정복',
    focus: 'Dạng bài câu hỏi - đáp ngắn, chọn nơi chốn, đọc biển báo, tờ rơi quảng cáo',
    description: 'Bước vào giai đoạn thực chiến đề thi: nhận diện bẫy thông thường trong phần 1 của cả 2 bài thi.',
    objectives: [
      'Giải quyết trọn vẹn dạng 1-4 phần Nghe (chọn câu hồi đáp tiếp theo phù hợp)',
      'Nhận diện tức thì địa điểm hội thoại qua các từ khóa then chốt (quán cà phê, bệnh viện, thư viện)',
      'Nắm chắc 100% điểm dạng đọc Biển báo & Thông báo ngắn (câu 31-34 bài Đọc)',
      'Luyện kỹ năng đọc lướt tìm ngày giờ, giá tiền, địa điểm trong tờ rơi'
    ],
    lessons: [
      {
        id: 'w5-l1',
        title: 'Bài 1: Bí kíp bài nghe chọn câu nối thoại (câu 1-4)',
        summary: 'Nghe câu nói của đối phương và chọn câu phản hồi lịch sự, tự nhiên nhất.',
        objectives: ['Phản xạ nhanh với các câu chào tạm biệt, cảm ơn, xin lỗi, mời ăn uống'],
        estimatedMinutes: 60,
        targetTab: 'listening'
      },
      {
        id: 'w5-l2',
        title: 'Bài 2: Bài nghe tìm địa điểm hội thoại (câu 5-6)',
        summary: 'Bắt các từ khóa then chốt: sách -> thư viện, thuốc -> hiệu thuốc, vé -> rạp chiếu phim.',
        objectives: ['Bộ từ vựng 15 địa điểm công cộng thường gặp nhất trong đề'],
        estimatedMinutes: 60,
        targetTab: 'listening'
      },
      {
        id: 'w5-l3',
        title: 'Bài 3: Đọc hiểu biển báo & thông báo ngắn (câu 31-34)',
        summary: 'Các biển cấm, bảng giờ mở cửa, menu, quảng cáo giảm giá.',
        objectives: ['Hiểu các từ vựng chỉ thời gian, giảm giá, cấm hút thuốc, cấm chụp ảnh'],
        estimatedMinutes: 60,
        targetTab: 'reading'
      },
      {
        id: 'w5-l4',
        title: 'Bài 4: Đọc điền từ vào chỗ trống câu đơn (câu 35-39)',
        summary: 'Xác định từ loại còn thiếu: tiểu từ, động từ trái nghĩa, trạng từ hay liên từ.',
        objectives: ['Chiến thuật loại trừ phương án sai nhanh trong 20 giây'],
        estimatedMinutes: 60,
        targetTab: 'reading'
      }
    ]
  },
  {
    weekNumber: 6,
    title: 'Tuần 6: Luyện kỹ năng đọc hiểu & nghe hiểu tình huống',
    koreanTheme: '상황별 듣기와 중급 읽기',
    focus: 'Hội thoại dài hai lượt nói, chọn hành động tiếp theo, đọc chọn nội dung giống với đoạn văn',
    description: 'Nâng cao khả năng phân tích nội dung chi tiết và phân biệt phương án đánh lừa.',
    objectives: [
      'Nghe hội thoại nam - nữ và xác định người nam/nữ sẽ làm gì tiếp theo',
      'Làm chủ dạng câu 40-42 bài Đọc: Chọn nội dung đúng với đoạn văn bản ngắn',
      'Đọc nhanh thông tin vé tàu, vé xem kịch, lịch trình công tác',
      'Ghi chú nhanh (note-taking) các số liệu và tên riêng khi nghe'
    ],
    lessons: [
      {
        id: 'w6-l1',
        title: 'Bài 1: Nghe hội thoại xác định hành động tiếp theo',
        summary: 'Tìm manh mối trong lời nói cuối cùng của nhân vật để biết hành động sắp tới.',
        objectives: ['Nhận biết câu đề nghị -(으)ㄹ게요, -(으)세요, 같이 ~자'],
        estimatedMinutes: 60,
        targetTab: 'listening'
      },
      {
        id: 'w6-l2',
        title: 'Bài 2: Đọc hiểu vé, biên lai và lịch trình',
        summary: 'Dạng bài thông tin thực tế yêu cầu tính chính xác cao về giờ khởi hành, giá vé, số ghế.',
        objectives: ['Không bị bẫy bởi các chi tiết ngày giờ âm dương hay đối tượng giảm giá'],
        estimatedMinutes: 60,
        targetTab: 'reading'
      },
      {
        id: 'w6-l3',
        title: 'Bài 3: Đọc đoạn văn chọn câu đúng (맞는 것 고르기)',
        summary: 'Kỹ thuật đối chiếu từng phương án với văn bản gốc, nhận diện từ đồng nghĩa.',
        objectives: ['Biết cách dò ý thay vì dịch từng chữ một'],
        estimatedMinutes: 60,
        targetTab: 'reading'
      },
      {
        id: 'w6-l4',
        title: 'Bài 4: Nghe đoạn văn độc thoại / thông báo công cộng',
        summary: 'Thông báo trên tàu xe, trung tâm thương mại, bản tin dự báo thời tiết ngắn.',
        objectives: ['Nắm bắt thông điệp chính ngay trong câu mở đầu'],
        estimatedMinutes: 60,
        targetTab: 'listening'
      }
    ]
  },
  {
    weekNumber: 7,
    title: 'Tuần 7: Luyện đề bấm giờ & Phân tích bẫy đề thi',
    koreanTheme: '실전 모의고사와 시간 안배',
    focus: 'Phân bổ thời gian: 40 phút cho 30 câu nghe, 60 phút cho 40 câu đọc',
    description: 'Rèn luyện áp lực thời gian, kỹ năng tô đáp án và xử lý câu hỏi khó không để trống.',
    objectives: [
      'Luyện tập dưới áp lực đồng hồ đếm ngược thực tế',
      'Chiến thuật đọc trước đáp án trong khoảng nghỉ giữa các câu nghe',
      'Tuyệt đối không dừng lại quá 1 phút ở 1 câu đọc hiểu',
      'Tổng hợp các bẫy liên từ và từ đồng âm thường làm mất điểm'
    ],
    lessons: [
      {
        id: 'w7-l1',
        title: 'Bài 1: Chiến thuật vàng phân bổ thời gian bài thi TOPIK I',
        summary: 'Quy tắc 30 giây cho câu đọc ngắn và 90 giây cho bài đọc kép.',
        objectives: ['Lập kế hoạch hoàn thành 100% đề thi không để sót câu'],
        estimatedMinutes: 60,
        targetTab: 'roadmap'
      },
      {
        id: 'w7-l2',
        title: 'Bài 2: Luyện đề Nghe thực chiến tổng hợp có bấm giờ',
        summary: 'Thực hành bộ câu hỏi nghe với tốc độ chuẩn kỳ thi.',
        objectives: ['Đạt tối thiểu 70/100 điểm phần Nghe sơ cấp'],
        estimatedMinutes: 60,
        targetTab: 'listening'
      },
      {
        id: 'w7-l3',
        title: 'Bài 3: Luyện đề Đọc thực chiến tổng hợp có bấm giờ',
        summary: 'Giải đề đọc 40 câu chọn lọc bám sát cấu trúc mới nhất.',
        objectives: ['Đạt tối thiểu 75/100 điểm phần Đọc sơ cấp'],
        estimatedMinutes: 60,
        targetTab: 'reading'
      },
      {
        id: 'w7-l4',
        title: 'Bài 4: Lọc và rà soát lỗi sai tuần 7',
        summary: 'Ghi lại mọi câu làm sai vào Sổ tay lỗi sai để ôn tập lại.',
        objectives: ['Phân tích lý do sai: do thiếu từ vựng hay sai ngữ pháp'],
        estimatedMinutes: 60,
        targetTab: 'errors'
      }
    ]
  },
  {
    weekNumber: 8,
    title: 'Tuần 8: Tổng ôn lỗi sai, Mẹo phòng thi & Về đích Level 2',
    koreanTheme: '총복습과 시험 전략',
    focus: 'Quét sạch lỗi sai trong sổ tay, ôn 100 từ vựng cốt lõi, tâm lý phòng thi',
    description: 'Chặng cuối tự tin bước vào phòng thi TOPIK I với mục tiêu điểm cao Level 2 (140+ / 200 điểm).',
    objectives: [
      'Xóa sạch 100% các câu hỏi còn tồn đọng trong Sổ tay lỗi sai',
      'Ôn tập nhanh flashcard toàn bộ từ vựng đã đánh dấu "Cần ôn tập"',
      'Ghi nhớ các lưu ý đi thi: bút chì, gôm, căn cước công dân, giấy báo thi',
      'Chuẩn bị tâm lý bình tĩnh, giữ vững phong độ'
    ],
    lessons: [
      {
        id: 'w8-l1',
        title: 'Bài 1: Quét sạch Sổ tay lỗi sai',
        summary: 'Làm lại toàn bộ các câu hỏi đã từng làm sai trong 7 tuần vừa qua.',
        objectives: ['Đạt tỷ lệ làm lại đúng trên 95%'],
        estimatedMinutes: 60,
        targetTab: 'errors'
      },
      {
        id: 'w8-l2',
        title: 'Bài 2: Tổng ôn tốc độ Flashcard từ vựng then chốt',
        summary: 'Rà soát các từ vựng hay gặp trong đề thi TOPIK I.',
        objectives: ['Phản xạ nghĩa tiếng Việt trong 1 giây'],
        estimatedMinutes: 60,
        targetTab: 'vocabulary'
      },
      {
        id: 'w8-l3',
        title: 'Bài 3: Bài thi tổng duyệt thử nghiệm cuối cùng',
        summary: 'Kiểm tra năng lực tổng hợp và đánh giá dự kiến điểm số Level 1 hay Level 2.',
        objectives: ['Đánh giá sẵn sàng cho ngày thi'],
        estimatedMinutes: 60,
        targetTab: 'stats'
      },
      {
        id: 'w8-l4',
        title: 'Bài 4: Danh sách kiểm tra ngày thi & Mẹo làm bài',
        summary: 'Những mẹo xử lý khi không nghe rõ, phương pháp loại trừ khi đọc phân vân 2 đáp án.',
        objectives: ['Tâm thế tự tin tối đa khi bước vào phòng thi'],
        estimatedMinutes: 60,
        targetTab: 'roadmap'
      }
    ]
  }
];
