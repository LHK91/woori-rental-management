document.addEventListener('DOMContentLoaded', () => {
    // 1. Create Widget HTML
    const chatbotHTML = `
        <div class="chatbot-widget">
            <div class="chatbot-window" id="chatbotWindow">
                <div class="chatbot-header">
                    <span><i class='bx bx-headphone' style="margin-right: 8px; vertical-align: middle;"></i>우리임대관리 챗봇</span>
                    <i class='bx bx-x chatbot-close' id="chatbotClose"></i>
                </div>
                <div class="chatbot-messages" id="chatbotMessages">
                    <!-- Messages will be injected here -->
                </div>
            </div>
            <div class="chatbot-button" id="chatbotButton">
                <i class='bx bx-message-rounded-dots'></i>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', chatbotHTML);

    const chatbotWindow = document.getElementById('chatbotWindow');
    const chatbotButton = document.getElementById('chatbotButton');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotMessages = document.getElementById('chatbotMessages');

    const faqs = [
        {
            q: "위탁 관리 수수료는 어떻게 되나요?",
            a: "관리 수수료는 건물의 규모, 관리 세대 수, 요청하시는 서비스 범위에 따라 다르게 산정됩니다. 무료 상담을 통해 합리적인 견적을 제안해 드립니다."
        },
        {
            q: "계약 중인 임차인이 있어도 관리를 맡길 수 있나요?",
            a: "네, 가능합니다. 기존 임대차 계약 내역을 인수받아 연속성 있게 관리해 드리며, 향후 계약 갱신이나 퇴거 시 당사에서 전문적으로 처리해 드립니다."
        },
        {
            q: "건물 시설에 문제가 생기면 어떻게 대처하나요?",
            a: "임차인으로부터 민원이 접수되면 즉시 당사 제휴 보수 업체를 통해 신속하게 처리하며, 수리 내역 및 비용은 임대인에게 투명하게 보고됩니다."
        },
        {
            q: "공실이 발생하면 어떻게 채워주시나요?",
            a: "당사의 온/오프라인 네트워크와 지역 인근 협력 부동산들을 활용하여 다각도로 매물을 홍보하고, 신속하게 우량 임차인을 모집합니다."
        }
    ];

    // Toggle Chatbot
    const toggleChatbot = () => {
        chatbotWindow.classList.toggle('active');
        if (chatbotWindow.classList.contains('active')) {
            chatbotButton.style.display = window.innerWidth <= 480 ? 'none' : 'flex';
            if (chatbotMessages.children.length === 0) {
                initChat();
            }
        } else {
            chatbotButton.style.display = 'flex';
        }
    };

    chatbotButton.addEventListener('click', toggleChatbot);
    chatbotClose.addEventListener('click', toggleChatbot);

    // Add Message
    const addMessage = (text, type = 'bot') => {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-bubble chat-${type}`;
        msgDiv.innerHTML = text;
        chatbotMessages.appendChild(msgDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    };

    // Show Options
    const showOptions = () => {
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'chat-options';
        
        faqs.forEach((faq, index) => {
            const btn = document.createElement('button');
            btn.className = 'chat-option-btn';
            btn.textContent = faq.q;
            btn.onclick = () => handleOptionClick(index, optionsDiv);
            optionsDiv.appendChild(btn);
        });

        chatbotMessages.appendChild(optionsDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    };

    // Handle Option Click
    const handleOptionClick = (index, optionsContainer) => {
        // Remove options
        optionsContainer.remove();
        
        // Add User Message
        addMessage(faqs[index].q, 'user');
        
        // Add Bot Reply with delay
        setTimeout(() => {
            addMessage(faqs[index].a, 'bot');
            
            // Show options again after a short delay
            setTimeout(() => {
                addMessage("다른 궁금한 점이 있으신가요?", 'bot');
                showOptions();
            }, 1000);
            
        }, 600);
    };

    // Initialize Chat
    const initChat = () => {
        addMessage("안녕하세요! (주)우리임대관리 AI 챗봇입니다. 무엇을 도와드릴까요?", 'bot');
        setTimeout(() => {
            showOptions();
        }, 500);
    };
});
