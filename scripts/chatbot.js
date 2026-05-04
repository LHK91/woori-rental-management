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
                <span>Q&A</span>
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
            a: "실질적으로 임대 수익이 발생하는 세대에 대해서만 수수료를 청구하며, 공실 기간에는 수수료가 면제됩니다. 상세 견적은 건물의 규모에 따라 맞춤형으로 제안해 드립니다."
        },
        {
            q: "연체 관리는 어떻게 이루어지나요?",
            a: "연체 발생 즉시 전문 담당자가 독촉을 시작하며, 내용증명 발송 및 법적 절차 자문 등 임대인의 피해를 최소화하기 위한 강력한 솔루션을 제공합니다."
        },
        {
            q: "시설 수리 비용 처리는 어떻게 하나요?",
            a: "소액 수선은 즉시 처리 후 월말에 정산하며, 고액 수선은 임대인의 승인을 얻은 후 진행합니다. 모든 과정은 투명하게 보고됩니다."
        },
        {
            q: "소규모 건물도 관리가 가능한가요?",
            a: "네, 당연합니다. 오피스텔 100세대 이상 단지뿐만 아니라 소규모 원룸, 다가구 주택, 상가 건물도 전문적인 관리가 가능합니다."
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
