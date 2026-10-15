import { GrammarLesson } from '../types';

export const GRAMMAR_DATA: GrammarLesson[] = [
  {
    id: 'g1',
    week: 2,
    pattern: 'N + 은/는 & N + 이/가',
    title: 'Tiểu từ chủ đề (-은/는) & Tiểu từ chủ ngữ (-이/가)',
    vietnameseMeaning: 'Thì / Là (chủ đề đối chiếu) & Chính ai / cái gì (chủ ngữ hành động)',
    explanation: 'Tiểu từ là linh hồn của ngữ pháp tiếng Hàn. -은/는 dùng để nêu chủ đề chính của câu chuyện hoặc so sánh, đối chiếu. Trong khi đó, -이/가 dùng để chỉ đích danh chủ ngữ thực hiện hành động, thông tin mới xuất hiện lần đầu hoặc đi với các tính từ như 있다/없다/좋다/많다.',
    formationRules: [
      {
        rule: 'Danh từ có patchim (phụ âm cuối) + 은 / 이',
        description: 'Khi âm tiết cuối cùng kết thúc bằng phụ âm, dùng 은 (chủ đề) hoặc 이 (chủ ngữ) để nối âm dễ đọc.',
        example: '선생님 + 은 -> 선생님은 / 동생 + 이 -> 동생이'
      },
      {
        rule: 'Danh từ không có patchim + 는 / 가',
        description: 'Khi âm tiết cuối cùng kết thúc bằng nguyên âm, dùng 는 (chủ đề) hoặc 가 (chủ ngữ).',
        example: '저 + 는 -> 저는 / 친구 + 가 -> 친구가'
      },
      {
        rule: 'Bất quy tắc đại từ với -이/가',
        description: 'Đại từ 저 (tôi) biến thành 제 (제가), 나 (tôi/mày) thành 내 (내가), 너 (bạn) thành 네 (네가).',
        example: '저 + 가 -> 제가 / 나 + 가 -> 내가'
      }
    ],
    examples: [
      {
        korean: '저는 베트남 사람입니다. 동생은 학생입니다.',
        vietnamese: 'Tôi là người Việt Nam. Còn em tôi là học sinh. (Nhấn mạnh chủ đề đối chiếu -는/은)'
      },
      {
        korean: '누가 민수 씨입니까? - 제가 민수입니다.',
        vietnamese: 'Ai là bạn Min-su? - Chính tôi là Min-su. (Hỏi đích danh chủ ngữ 누가 -> trả lời 제가)'
      },
      {
        korean: '교실에 컴퓨터가 있어요.',
        vietnamese: 'Trong phòng học có máy vi tính. (Có cái gì đó đi kèm với -이/가 있어요)'
      }
    ],
    commonMistakes: 'Lỗi phổ biến nhất là dùng "저가" thay vì "제가", hoặc dùng "은/는" trước động từ/tính từ tồn tại như "있어요/없어요" khi không có ý so sánh đối chiếu.',
    quizzes: [
      {
        id: 'g1-q1',
        question: 'Chọn tiểu từ thích hợp: "한국어 책(___) 가방 안에 있어요."',
        options: ['은', '이', '을', '는'],
        correctAnswer: 1,
        explanation: '책 có patchim kết thúc bằng ㄱ và đi kèm cấu trúc tồn tại "있어요", do đó dùng tiểu từ chủ ngữ "이".'
      },
      {
        id: 'g1-q2',
        question: 'Chọn câu viết đúng ngữ pháp khi tự giới thiệu bản thân:',
        options: [
          '저가 흐엉입니다.',
          '저는 흐엉입니다.',
          '저를 흐엉입니다.',
          '저에 흐엉입니다.'
        ],
        correctAnswer: 1,
        explanation: 'Khi giới thiệu chủ đề về bản thân "Tôi là Hương", ta dùng "저는" (저 không có patchim + 는).'
      }
    ]
  },
  {
    id: 'g2',
    week: 2,
    pattern: 'N + 입니다 / 입니까? & N + 이에요/예요',
    title: 'Đuôi câu danh từ "Là..." trang trọng & thân mật',
    vietnameseMeaning: 'Là N / Có phải là N không?',
    explanation: '-입니다 (câu khẳng định) và -입니까? (câu nghi vấn) là đuôi câu trang trọng cao cấp, thường dùng trong phỏng vấn, tin tức, môi trường công sở. Trong giao tiếp đời thường, người Hàn thường dùng đuôi câu thân mật -이에요/예요.',
    formationRules: [
      {
        rule: 'Trang trọng: Bất kể có patchim hay không đều + 입니다 / 입니까?',
        description: 'Rất đơn giản, chỉ cần ghép thẳng vào sau danh từ.',
        example: '학생 + 입니다 -> 학생입니다 / 의사 + 입니까? -> 의사입니까?'
      },
      {
        rule: 'Thân mật: Danh từ có patchim + 이에요',
        description: 'Nối âm patchim lên chữ 이.',
        example: '선생님 + 이에요 -> 선생님이에요'
      },
      {
        rule: 'Thân mật: Danh từ không patchim + 예요',
        description: 'Kết thúc bằng nguyên âm nên gắn liền với 예요.',
        example: '의사 + 예요 -> 의사예요'
      }
    ],
    examples: [
      {
        korean: '저는 한국어과 학생입니다.',
        vietnamese: 'Tôi là sinh viên khoa tiếng Hàn.'
      },
      {
        korean: '이것은 무엇입니까? - 그것은 한국어 사전이에요.',
        vietnamese: 'Đây là cái gì thế ạ? - Đó là từ điển tiếng Hàn.'
      }
    ],
    commonMistakes: 'Viết sai chính tả đuôi thân mật "이예요" thay vì "이에요", hoặc nhầm khi danh từ không có patchim lại dùng "이에요" (đúng phải là 예요 như: 시계예요).',
    quizzes: [
      {
        id: 'g2-q1',
        question: 'Hoàn thành câu giao tiếp thân mật: "이 사람은 제 친구(___)."',
        options: ['이에요', '예요', '입니까', '있어요'],
        correctAnswer: 1,
        explanation: '친구 kết thúc bằng nguyên âm ㅜ (không có patchim), nên đuôi câu thân mật đúng là "예요" (친구예요).'
      }
    ]
  },
  {
    id: 'g3',
    week: 2,
    pattern: 'A/V + 아/어요',
    title: 'Đuôi câu thân mật - lịch sự thì hiện tại',
    vietnameseMeaning: 'Làm gì / Như thế nào (đuôi câu giao tiếp phổ biến nhất)',
    explanation: 'Đây là hình thức chia động từ và tính từ được sử dụng nhiều nhất trong đời sống hàng ngày của người Hàn Quốc và xuất hiện liên tục trong đề thi nghe TOPIK I. Quy tắc dựa vào nguyên âm cuối của gốc từ.',
    formationRules: [
      {
        rule: 'Gốc từ có nguyên âm ㅏ hoặc ㅗ -> cộng với -아요',
        description: 'Nếu không có patchim sẽ gộp âm: 가다 -> 가요, 보다 -> 봐요.',
        example: '살다 -> 살아요 / 오다 -> 와요'
      },
      {
        rule: 'Gốc từ có các nguyên âm còn lại (ㅓ, ㅜ, ㅣ, ㅡ, ㅐ...) -> cộng với -어요',
        description: 'Gộp âm: 마시다 -> 마셔요, 배우다 -> 배워요.',
        example: '먹다 -> 먹어요 / 읽다 -> 읽어요'
      },
      {
        rule: 'Gốc từ kết thúc bằng 하다 -> luôn biến thành 해요',
        description: 'Mọi động/tính từ tận cùng bằng 하다 đều chuyển thành 해요.',
        example: '공부하다 -> 공부해요 / 좋아하다 -> 좋아해요'
      }
    ],
    examples: [
      {
        korean: '지금 도서관에서 책을 읽어요.',
        vietnamese: 'Bây giờ tôi đọc sách ở thư viện.'
      },
      {
        korean: '저는 매일 아침 커피를 마셔요.',
        vietnamese: 'Mỗi buổi sáng tôi đều uống cà phê.'
      }
    ],
    commonMistakes: 'Quên rút gọn âm khi từ không có patchim: ví dụ viết "가아요" thay vì "가요", hay viết "마시어요" thay vì "마셔요".',
    quizzes: [
      {
        id: 'g3-q1',
        question: 'Động từ "만나다" (gặp gỡ) khi chia sang đuôi "-아/어요" sẽ là:',
        options: ['만나요', '만나어요', '만나해요', '만납니다요'],
        correctAnswer: 0,
        explanation: '만나다 có gốc từ 만나 tận cùng là nguyên âm ㅏ không có patchim, gộp âm ㅏ + ㅏ = ㅏ tạo thành 만나요.'
      }
    ]
  },
  {
    id: 'g4',
    week: 3,
    pattern: 'N + 을/를',
    title: 'Tiểu từ tân ngữ trực tiếp',
    vietnameseMeaning: 'Chỉ tân ngữ chịu tác động của hành động',
    explanation: 'Tiểu từ 을/를 gắn vào sau danh từ để biến danh từ đó thành đối tượng chịu tác động trực tiếp của ngoại động từ (như ăn cơm, uống nước, mua sách, xem phim).',
    formationRules: [
      {
        rule: 'Danh từ có patchim + 을',
        description: 'Nối âm patchim sang âm 을.',
        example: '밥 + 을 -> 밥을 [바블] / 책 + 을 -> 책을 [채글]'
      },
      {
        rule: 'Danh từ không có patchim + 를',
        description: 'Gắn liền sau nguyên âm.',
        example: '사과 + 를 -> 사과를 / 커피 + 를 -> 커피를'
      }
    ],
    examples: [
      {
        korean: '점심에 빵을 먹었습니다.',
        vietnamese: 'Tôi đã ăn bánh mì vào bữa trưa.'
      },
      {
        korean: '주말에 친구와 영화를 봐요.',
        vietnamese: 'Cuối tuần tôi xem phim cùng bạn bè.'
      }
    ],
    commonMistakes: 'Dùng tiểu từ 을/를 với tính từ hoặc các từ chỉ trạng thái như 있다/없다/좋다 (ví dụ sai: "한국어를 좋아요", đúng phải là "한국어가 좋아요" hoặc "한국어를 좋아해요").',
    quizzes: [
      {
        id: 'g4-q1',
        question: 'Điền tiểu từ thích hợp: "저는 음악(___) 들어요."',
        options: ['은', '이', '을', '를'],
        correctAnswer: 2,
        explanation: '음악 (âm nhạc) có patchim kết thúc bằng ㄱ và là tân ngữ chịu tác động của động từ 듣다 (nghe), nên đi với "을".'
      }
    ]
  },
  {
    id: 'g5',
    week: 3,
    pattern: 'N + 에 & N + 에서',
    title: 'Tiểu từ nơi chốn: Phân biệt "에" và "에서"',
    vietnameseMeaning: 'Ở / Đến (phương hướng, tồn tại, thời gian) vs Tại (nơi diễn ra hành động)',
    explanation: 'Đây là bẫy kinh điển trong bài thi TOPIK I. Cả hai đều dịch sang tiếng Việt là "ở", nhưng bản chất hoàn toàn khác nhau: "에" dùng với động từ di chuyển (가다, 오다) hoặc trạng thái tồn tại (있다, 없다); còn "에서" dùng cho nơi diễn ra một hành vi cụ thể (học bài, ăn cơm, mua sắm).',
    formationRules: [
      {
        rule: 'Nơi chốn + 에 + 가다 / 오다 / 있다 / 없다',
        description: 'Chỉ đích đến hoặc nơi tồn tại của người/vật.',
        example: '집에 가요 (về nhà), 교실에 있어요 (ở trong lớp)'
      },
      {
        rule: 'Nơi chốn + 에서 + Động từ hành động',
        description: 'Chỉ nơi diễn ra một hành động cụ thể.',
        example: '식당에서 밥을 먹어요 (ăn cơm tại nhà hàng)'
      },
      {
        rule: 'Thời gian + 에 (không dùng 에서 cho thời gian)',
        description: 'Gắn vào mốc thời gian (ngoại trừ 어제, 오늘, 내일, 지금).',
        example: '3시에 만나요 (gặp lúc 3 giờ)'
      }
    ],
    examples: [
      {
        korean: '저는 도서관에 가요. 도서관에서 공부해요.',
        vietnamese: 'Tôi đi đến thư viện (에). Tôi học bài tại thư viện (에서).'
      },
      {
        korean: '백화점에서 옷을 샀어요.',
        vietnamese: 'Tôi đã mua quần áo tại trung tâm thương mại.'
      }
    ],
    commonMistakes: 'Dùng "학교에 공부해요" (SAI) thay vì "학교에서 공부해요" (ĐÚNG) vì 공부하다 là một hành động cụ thể.',
    quizzes: [
      {
        id: 'g5-q1',
        question: 'Chọn phương án đúng: "민수 씨는 카페(___) 커피를 마셔요."',
        options: ['에', '에서', '을', '로'],
        correctAnswer: 1,
        explanation: 'Hành động uống cà phê (커피를 마셔요) diễn ra tại quán cà phê, do đó bắt buộc phải dùng tiểu từ nơi chốn hành động "에서".'
      }
    ]
  },
  {
    id: 'g6',
    week: 3,
    pattern: 'A/V + 았/었어요',
    title: 'Thì quá khứ (Đã làm gì / Đã như thế nào)',
    vietnameseMeaning: 'Đã...',
    explanation: 'Dùng để diễn tả một hành động hoặc trạng thái đã hoàn thành trong quá khứ. Thường đi kèm với các trạng từ thời gian như 어제 (hôm qua), 지난주 (tuần trước), 작년 (năm ngoái).',
    formationRules: [
      {
        rule: 'Gốc từ kết thúc bằng nguyên âm ㅏ, ㅗ -> + 았어요',
        description: 'Gộp âm: 가다 -> 갔어요, 보다 -> 봤어요.',
        example: '만나다 -> 만났어요 / 좋다 -> 좋았어요'
      },
      {
        rule: 'Gốc từ kết thúc bằng các nguyên âm khác -> + 었어요',
        description: 'Gộp âm: 먹다 -> 먹었어요, 마시다 -> 마셨어요.',
        example: '읽다 -> 읽었어요 / 배우다 -> 배웠어요'
      },
      {
        rule: 'Động từ tận cùng bằng 하다 -> biến thành 했어요',
        description: 'Ví dụ: 공부하다 -> 공부했어요, 운동하다 -> 운동했어요.',
        example: '일하다 -> 일했어요 / 쇼핑하다 -> 쇼핑했어요'
      }
    ],
    examples: [
      {
        korean: '어제 친구와 같이 영화를 봤어요.',
        vietnamese: 'Hôm qua tôi đã xem phim cùng với bạn bè.'
      },
      {
        korean: '지난 주말에 부산으로 여행을 갔어요.',
        vietnamese: 'Cuối tuần trước tôi đã đi du lịch tới Busan.'
      }
    ],
    commonMistakes: 'Chia sai động từ 하다 thành "하았어요" hay "하었어요" (luôn luôn là 했어요).',
    quizzes: [
      {
        id: 'g6-q1',
        question: 'Chia quá khứ cho câu: "어제 집에서 한국어 숙제를 (하다)."',
        options: ['해요', '했어요', '하았어요', '할 거예요'],
        correctAnswer: 1,
        explanation: 'Vì có trạng từ quá khứ "어제" (hôm qua) và động từ 하다, dạng chia quá khứ chính xác là "했어요".'
      }
    ]
  },
  {
    id: 'g7',
    week: 4,
    pattern: 'A/V + -(으)ㄹ 거예요',
    title: 'Thì tương lai & Dự định (Sẽ làm gì)',
    vietnameseMeaning: 'Sẽ / Định làm gì đó',
    explanation: 'Dùng để diễn tả một dự định, kế hoạch trong tương lai của người nói, hoặc phỏng đoán một sự việc sắp xảy ra. Thường đi với 내일 (ngày mai), 주말 (cuối tuần), 다음 달 (tháng sau).',
    formationRules: [
      {
        rule: 'Gốc động từ có patchim + 을 거예요',
        description: 'Ví dụ: 먹다 -> 먹을 거예요, 읽다 -> 읽을 거예요.',
        example: '책을 읽을 거예요 (Tôi sẽ đọc sách)'
      },
      {
        rule: 'Gốc động từ không có patchim + ㄹ 거예요',
        description: 'Patchim ㄹ gắn ngay dưới chân chữ cái.',
        example: '가다 -> 갈 거예요 / 하다 -> 할 거예요'
      },
      {
        rule: 'Bất quy tắc patchim ㄹ chỉ cần + 거예요',
        description: 'Ví dụ: 만들다 -> 만들 거예요.',
        example: '케이크를 만들 거예요'
      }
    ],
    examples: [
      {
        korean: '이번 주말에 친구를 만날 거예요.',
        vietnamese: 'Cuối tuần này tôi sẽ đi gặp bạn bè.'
      },
      {
        korean: '내년에는 한국으로 유학을 갈 거예요.',
        vietnamese: 'Sang năm tôi sẽ đi du học sang Hàn Quốc.'
      }
    ],
    commonMistakes: 'Viết sai chính tả chữ "거예요" thành "거에요". Trong tiếng Hàn chuẩn, đuôi này luôn viết là "예요".',
    quizzes: [
      {
        id: 'g7-q1',
        question: 'Dạng tương lai của "쉬다" (nghỉ ngơi) là:',
        options: ['쉴 거예요', '쉬을 거예요', '쉬었어요', '쉬고 싶어요'],
        correctAnswer: 0,
        explanation: '쉬다 không có patchim nên ghép ㄹ vào dưới chân: 쉬 + ㄹ 거예요 = 쉴 거예요.'
      }
    ]
  },
  {
    id: 'g8',
    week: 4,
    pattern: 'V + -(으)ㄹ 수 있다/없다',
    title: 'Khả năng: Có thể / Không thể làm gì',
    vietnameseMeaning: 'Có thể làm V / Không thể làm V',
    explanation: 'Cấu trúc diễn tả khả năng, năng lực hoặc điều kiện cho phép để thực hiện một hành động nào đó. Trái ngược với 있다 là 없다 (không có khả năng làm).',
    formationRules: [
      {
        rule: 'Động từ có patchim + 을 수 있다/없다',
        description: 'Ví dụ: 먹을 수 있어요, 읽을 수 없어요.',
        example: '한국 신문을 읽을 수 있어요'
      },
      {
        rule: 'Động từ không patchim + ㄹ 수 있다/없다',
        description: 'Ví dụ: 운전할 수 있어요, 수영할 수 없어요.',
        example: '저는 수영을 할 수 없어요'
      }
    ],
    examples: [
      {
        korean: '저는 한국어를 조금 말할 수 있어요.',
        vietnamese: 'Tôi có thể nói được một chút tiếng Hàn.'
      },
      {
        korean: '오늘은 바빠서 모임에 갈 수 없어요.',
        vietnamese: 'Hôm nay vì bận nên tôi không thể đến buổi gặp mặt được.'
      }
    ],
    commonMistakes: 'Nhầm lẫn giữa "못 V" (không thể do hoàn cảnh) và "안 V" (không muốn làm). -(으)ㄹ 수 없다 nhấn mạnh việc thiếu năng lực hoặc hoàn cảnh không cho phép.',
    quizzes: [
      {
        id: 'g8-q1',
        question: 'Câu nào mang nghĩa "Tôi có thể lái xe"?',
        options: [
          '저는 운전할 수 있어요.',
          '저는 운전하고 싶어요.',
          '저는 운전했어요.',
          '저는 운전하지 않아요.'
        ],
        correctAnswer: 0,
        explanation: '운전하다 (lái xe) kết thúc không có patchim + ㄹ 수 있어요 -> "운전할 수 있어요".'
      }
    ]
  },
  {
    id: 'g9',
    week: 4,
    pattern: 'V + -고 싶다',
    title: 'Mong muốn: Muốn làm gì',
    vietnameseMeaning: 'Muốn làm V (ngôi thứ 1 và 2) / -고 싶어하다 (ngôi thứ 3)',
    explanation: 'Gắn trực tiếp vào sau gốc động từ để biểu thị mong muốn, nguyện vọng của người nói. Khi nói về mong muốn của người thứ ba, dùng -고 싶어하다.',
    formationRules: [
      {
        rule: 'Gốc động từ (bất kể có patchim hay không) + 고 싶다',
        description: 'Không cần biến đổi gốc động từ.',
        example: '가다 -> 가고 싶어요 / 먹다 -> 먹고 싶어요'
      }
    ],
    examples: [
      {
        korean: '한국에 여행을 가고 싶어요.',
        vietnamese: 'Tôi muốn đi du lịch đến Hàn Quốc.'
      },
      {
        korean: '따뜻한 커피를 마시고 싶습니다.',
        vietnamese: 'Tôi muốn uống một tách cà phê ấm.'
      }
    ],
    commonMistakes: 'Nói về người thứ ba (bố, mẹ, bạn) nhưng lại dùng "-고 싶어요" thay vì "-고 싶어해요" (ví dụ: "동생은 한국에 가고 싶어해요").',
    quizzes: [
      {
        id: 'g9-q1',
        question: 'Chọn câu diễn đạt "Tôi muốn xem bộ phim này":',
        options: [
          '이 영화를 보고 싶어요.',
          '이 영화를 봤어요.',
          '이 영화를 볼 수 없어요.',
          '이 영화를 봅니다.'
        ],
        correctAnswer: 0,
        explanation: '보다 (xem) + 고 싶어요 = 보고 싶어요 (muốn xem).'
      }
    ]
  },
  {
    id: 'g10',
    week: 4,
    pattern: 'Liên từ nối: -고 & -지만 & -아서/어서',
    title: 'Liên kết câu: Liệt kê (-고), Tương phản (-지만) & Nguyên nhân (-아서/어서)',
    vietnameseMeaning: 'Và / Nhưng / Vì... nên...',
    explanation: 'Bộ 3 liên từ nối câu quan trọng nhất xuất hiện trong 80% các câu văn đọc hiểu TOPIK I. -고 nối hai vế đẳng lập; -지만 nối hai vế tương phản trái ngược; -아서/어서 nối vế trước là nguyên nhân của vế sau.',
    formationRules: [
      {
        rule: 'A/V + 고: Liệt kê hành động, tính chất',
        description: 'Gắn trực tiếp vào gốc từ: 크고 좋아요 (to và đẹp), 밥을 먹고 학교에 가요 (ăn cơm rồi đến trường).',
        example: '사과는 싸고 맛있어요'
      },
      {
        rule: 'A/V + 지만: Nhưng, tuy nhiên',
        description: 'Gắn trực tiếp vào gốc từ: 한국어는 어렵지만 재미있어요 (tiếng Hàn khó nhưng thú vị).',
        example: '비가 오지만 날씨가 춥지 않아요'
      },
      {
        rule: 'A/V + 아서/어서: Vì... nên...',
        description: 'Chia theo nguyên âm như đuôi -아/어요. LƯU Ý: Không được chia thì quá khứ trước -아서/어서.',
        example: '감기에 걸려서 병원에 갔어요 (Vì bị cảm nên đã đi bệnh viện)'
      }
    ],
    examples: [
      {
        korean: '배가 고파서 식당에 갔습니다.',
        vietnamese: 'Vì đói bụng nên tôi đã đến nhà hàng.'
      },
      {
        korean: '이 옷은 예쁘지만 너무 비싸요.',
        vietnamese: 'Bộ quần áo này đẹp nhưng đắt quá.'
      }
    ],
    commonMistakes: 'Tuyệt đối không chia thì quá khứ trước -아서/어서 (ví dụ sai: "비가 왔어서", đúng phải là "비가 와서").',
    quizzes: [
      {
        id: 'g10-q1',
        question: 'Nối hai vế "Hôm qua vì mệt nên tôi đã đi ngủ sớm":',
        options: [
          '어제 피곤해서 일찍 잤어요.',
          '어제 피곤했어서 일찍 잤어요.',
          '어제 피곤하지만 일찍 잤어요.',
          '어제 피곤하고 일찍 잤어요.'
        ],
        correctAnswer: 0,
        explanation: 'Trước -아서/어서 không chia thì quá khứ, dù vế sau có thì quá khứ (잤어요). Dạng đúng là "피곤해서".'
      }
    ]
  }
];
