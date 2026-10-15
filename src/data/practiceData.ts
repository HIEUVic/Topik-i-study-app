import { PracticeQuestion } from '../types';

export const PRACTICE_QUESTIONS: PracticeQuestion[] = [
  // --- LUYỆN NGHE (LISTENING) ---
  {
    id: 'l1',
    type: 'listening',
    category: 'Nghe nối câu hội thoại (Câu 1-4 dạng đề)',
    week: 5,
    title: 'Câu 1: Phản xạ câu hỏi thăm hàng ngày',
    passage: 'Hội thoại ngắn giữa hai người bạn gặp nhau vào buổi sáng.',
    audioScript: '여: 안녕하세요? 오늘 날씨가 참 좋지요?\n남: 네, ________.',
    audioSpeaker: 'Nữ hỏi & Nam trả lời',
    question: 'Hãy nghe và chọn câu trả lời tự nhiên, phù hợp nhất của người nam:',
    options: [
      '네, 정말 따뜻해요.',
      '아니요, 내일 만나요.',
      '네, 안녕히 가세요.',
      '아니요, 저는 학생이에요.'
    ],
    correctAnswer: 0,
    explanation: 'Người nữ nói "Chào bạn, hôm nay thời tiết đẹp thật đấy nhỉ?". Câu phản hồi tự nhiên và logic nhất từ người nam là "네, 정말 따뜻해요." (Vâng, thật sự rất ấm áp). Các phương án khác lạc đề hoặc sai ngữ cảnh.'
  },
  {
    id: 'l2',
    type: 'listening',
    category: 'Nghe nối câu hội thoại (Câu 1-4 dạng đề)',
    week: 5,
    title: 'Câu 2: Chào tạm biệt sau giờ học',
    passage: 'Hai bạn học sinh chia tay nhau tại cổng trường.',
    audioScript: '남: 수업 끝났네요. 내일 또 봐요!\n여: 네, ________.',
    audioSpeaker: 'Nam chào & Nữ đáp',
    question: 'Chọn câu đáp lại thích hợp nhất của người nữ:',
    options: [
      '처음 뵙겠습니다.',
      '내일 만나요. 잘 가요!',
      '죄송합니다.',
      '감사하지 않습니다.'
    ],
    correctAnswer: 1,
    explanation: 'Người nam chào "Tan học rồi nhỉ. Ngày mai lại gặp nhé!". Người nữ chào lại phù hợp nhất là "네, 내일 만나요. 잘 가요!" (Vâng, mai gặp nhé. Đi về cẩn thận nhé!).'
  },
  {
    id: 'l3',
    type: 'listening',
    category: 'Nghe tìm địa điểm hội thoại (Câu 5-6 dạng đề)',
    week: 5,
    title: 'Câu 3: Đoán nơi chốn qua từ khóa',
    passage: 'Đoạn hội thoại giao dịch ngắn.',
    audioScript: '여: 어서 오세요. 무엇을 도와드릴까요?\n남: 머리가 아파서 왔어요. 두통약 좀 주세요.',
    audioSpeaker: 'Nữ & Nam',
    question: 'Hai người đang nói chuyện ở đâu? (여기는 어디입니까?)',
    options: [
      '약국 (Hiệu thuốc)',
      '도서관 (Thư viện)',
      '우체국 (Bưu điện)',
      '미용실 (Tiệm cắt tóc)'
    ],
    correctAnswer: 0,
    explanation: 'Người nam nói "머리가 아파서 왔어요. 두통약 좀 주세요" (Tôi bị đau đầu nên đến đây. Xin hãy cho tôi thuốc đau đầu). Từ khóa "두통약" (thuốc đau đầu) chỉ ra địa điểm chắc chắn là "약국" (hiệu thuốc).'
  },
  {
    id: 'l4',
    type: 'listening',
    category: 'Nghe tìm địa điểm hội thoại (Câu 5-6 dạng đề)',
    week: 6,
    title: 'Câu 4: Nghe tìm nơi chốn công cộng',
    passage: 'Đoạn hội thoại hỏi mượn đồ.',
    audioScript: '남: 저, 이 책 오늘 빌릴 수 있어요?\n여: 네, 학생증을 보여 주시면 대출해 드릴게요.',
    audioSpeaker: 'Nam sinh viên & Nữ nhân viên',
    question: 'Địa điểm diễn ra cuộc trò chuyện là:',
    options: [
      '도서관 (Thư viện)',
      '식당 (Nhà hàng)',
      '지하철 (Tàu điện ngầm)',
      '은행 (Ngân hàng)'
    ],
    correctAnswer: 0,
    explanation: 'Từ khóa "책을 빌리다" (mượn sách) và "학생증" (thẻ sinh viên), "대출" (cho mượn) khẳng định đây là "도서관" (thư viện).'
  },
  {
    id: 'l5',
    type: 'listening',
    category: 'Hành động tiếp theo của nhân vật (Câu 7-10 dạng đề)',
    week: 6,
    title: 'Câu 5: Người nam sẽ làm gì tiếp theo?',
    passage: 'Hội thoại chuẩn bị cho bữa tiệc sinh nhật bạn.',
    audioScript: '여: 민수 씨, 케이크 샀어요?\n남: 아, 깜빡 잊었어요. 제가 지금 바로 빵집에 다녀올게요.\n여: 네, 서둘러 다녀오세요.',
    audioSpeaker: 'Nữ nhắc & Nam nhận nhiệm vụ',
    question: 'Người nam sẽ làm việc gì ngay sau đây? (남자는 다음에 무엇을 하겠습니까?)',
    options: [
      '빵집에 가서 케이크를 산다 (Đến tiệm bánh mua bánh kem)',
      '집에서 잠을 잔다 (Ở nhà đi ngủ)',
      '친구에게 전화를 건다 (Gọi điện thoại cho bạn bè)',
      '식당을 예약한다 (Đặt chỗ nhà hàng)'
    ],
    correctAnswer: 0,
    explanation: 'Người nam nói: "제가 지금 바로 빵집에 다녀올게요" (Tôi sẽ chạy ngay ra tiệm bánh bây giờ đây), vì vậy hành động tiếp theo là đến tiệm bánh mua bánh kem.'
  },

  // --- LUYỆN ĐỌC (READING) ---
  {
    id: 'r1',
    type: 'reading',
    category: 'Đọc hiểu biển báo & thông báo ngắn (Câu 31-34 dạng đề)',
    week: 5,
    title: 'Câu 1: Biển báo tại rạp chiếu phim',
    hasVisual: true,
    visualNotice: {
      badge: '안내문 (THÔNG BÁO)',
      header: '영화관 내 사진 촬영 금지',
      body: [
        '• 상영 중 사진 및 동영상 촬영 불가',
        '• 휴대전화는 진동 또는 무음 모드로 전환 바랍니다'
      ],
      subtext: 'CGV 영화관 올림'
    },
    question: 'Biển báo này thông báo điều gì? (무엇에 대한 안내문입니까?)',
    options: [
      '사진 촬영 주의 (Quy định chụp ảnh và điện thoại trong rạp)',
      '영화표 가격 할인 (Giảm giá vé xem phim)',
      '영화관 청소 시간 (Thời gian dọn dẹp rạp)',
      '새 영화 소개 (Giới thiệu phim mới)'
    ],
    correctAnswer: 0,
    explanation: 'Biển thông báo có ghi "사진 촬영 금지" (Cấm chụp ảnh) và "휴대전화 무음" (Chuyển điện thoại sang chế độ rung/im lặng), nên đáp án chính xác là "사진 촬영 주의" (Lưu ý về chụp ảnh).'
  },
  {
    id: 'r2',
    type: 'reading',
    category: 'Đọc hiểu biển báo & thông báo ngắn (Câu 31-34 dạng đề)',
    week: 5,
    title: 'Câu 2: Bảng thông báo giờ làm việc của thư viện',
    hasVisual: true,
    visualNotice: {
      badge: '이용 시간 안내',
      header: '시립 도서관 이용 안내',
      body: [
        '• 평일 (Thứ 2 - Thứ 6): 09:00 ~ 21:00',
        '• 주말 (Thứ 7 - CN): 09:00 ~ 18:00',
        '• 휴관일: 매주 월요일'
      ],
      subtext: '문의: 02-123-4567'
    },
    question: 'Nội dung nào dưới đây là ĐÚNG với bảng thông báo trên?',
    options: [
      '월요일에는 도서관 문을 열지 않습니다. (Thứ 2 thư viện không mở cửa)',
      '주말에는 밤 9시까지 공부할 수 있습니다. (Cuối tuần có thể học đến 9h tối)',
      '평일에는 오후 6시에 문을 닫습니다. (Ngày trong tuần đóng cửa lúc 6h chiều)',
      '토요일에는 도서관을 이용할 수 없습니다. (Thứ 7 không thể dùng thư viện)'
    ],
    correctAnswer: 0,
    explanation: 'Trong thông báo ghi rõ "휴관일: 매주 월요일" (Ngày nghỉ: Thứ Hai hàng tuần), do đó câu "월요일에는 도서관 문을 열지 않습니다" là hoàn toàn chính xác. Cuối tuần chỉ mở đến 18:00 chứ không phải 21:00.'
  },
  {
    id: 'r3',
    type: 'reading',
    category: 'Điền từ vào chỗ trống câu đơn (Câu 35-39 dạng đề)',
    week: 5,
    title: 'Câu 3: Chọn liên từ hoặc động từ thích hợp',
    passage: '저는 음악 듣는 것을 아주 좋아합니다. (________) 매일 아침에 음악을 들으면서 운동을 합니다.',
    question: 'Hãy chọn từ thích hợp nhất để điền vào chỗ trống (괄호 안에 들어갈 가장 알맞은 것을 고르십시오):',
    options: [
      '그래서 (Vì vậy, do đó)',
      '그러나 (Tuy nhiên)',
      '그런데 (Nhân tiện, nhưng mà)',
      '그러면 (Nếu thế thì)'
    ],
    correctAnswer: 0,
    explanation: 'Vế trước nêu sở thích: "Tôi rất thích nghe nhạc." Vế sau nêu hành động hệ quả: "Mỗi sáng tôi vừa nghe nhạc vừa tập thể dục." Vì vậy dùng liên từ chỉ quan hệ nhân - quả "그래서" (Vì vậy).'
  },
  {
    id: 'r4',
    type: 'reading',
    category: 'Đọc đoạn văn chọn nội dung giống (Câu 40-42 dạng đề)',
    week: 6,
    title: 'Câu 4: Thói quen sinh hoạt cuối tuần của bạn Hương',
    passage: '저는 주말마다 한국인 친구 민수 씨를 만납니다. 우리는 같이 시내 카페에서 한국어와 베트남어를 서로 가르쳐 줍니다. 공부가 끝난 후에는 시장에 가서 맛있는 떡볶이를 사 먹습니다. 한국어를 공부하는 것이 정말 재미있습니다.',
    question: 'Hãy chọn câu có nội dung GIỐNG với đoạn văn trên (이 글의 내용과 같은 것을 고르십시오):',
    options: [
      '두 사람은 카페에서 언어를 서로 가르칩니다. (Hai người dạy ngôn ngữ cho nhau ở quán cà phê)',
      '민수 씨는 베트남어를 가르쳐 주지 않습니다. (Bạn Min-su không dạy tiếng Việt)',
      '공부가 끝나면 곧바로 집으로 돌아갑니다. (Học xong là đi thẳng về nhà)',
      '저는 한국어 공부가 너무 지루합니다. (Tôi cảm thấy học tiếng Hàn rất buồn chán)'
    ],
    correctAnswer: 0,
    explanation: 'Đoạn văn có câu: "우리는 같이 시내 카페에서 한국어와 베트남어를 서로 가르쳐 줍니다." (Chúng tôi cùng nhau dạy tiếng Hàn và tiếng Việt cho nhau ở quán cà phê), hoàn toàn khớp với đáp án 1. Đáp án 3 sai vì học xong họ đi chợ ăn bánh gạo tokbokki.'
  },
  {
    id: 'r5',
    type: 'reading',
    category: 'Đọc hiểu mẩu tin nhắn ngắn',
    week: 6,
    title: 'Câu 5: Tin nhắn hẹn giờ gặp mặt',
    passage: '수진 씨, 미안해요. 지하철이 늦게 와서 약속 시간보다 15분 늦을 것 같아요. 먼저 서점에 들어가서 책을 보고 계세요. 제가 도착하면 바로 연락할게요!',
    question: 'Người gửi tin nhắn muốn nói điều gì?',
    options: [
      '약속 시간에 늦을 것 같아서 양해를 구하고 있다. (Xin thông cảm vì sẽ đến trễ hẹn)',
      '약속을 다음 주로 취소하고 싶어한다. (Muốn hủy hẹn sang tuần sau)',
      '서점 위치를 몰라서 물어보고 있다. (Hỏi địa chỉ hiệu sách vì không biết)',
      '지하철을 타지 못해서 걸어가고 있다. (Không đi được tàu nên đang đi bộ)'
    ],
    correctAnswer: 0,
    explanation: 'Tin nhắn xin lỗi "미안해요... 15분 늦을 것 같아요" (Xin lỗi, vì tàu đến muộn nên có lẽ tôi sẽ trễ 15 phút so với giờ hẹn) thể hiện việc báo trễ và mong bạn thông cảm.'
  }
];
