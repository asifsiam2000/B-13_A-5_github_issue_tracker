const cardContainer = document.getElementById('card-container');
const loading = document.getElementById('loading');

function displayIssur(data) {
    cardContainer.innerHTML = '';

    data.data.forEach(element => {

        const levelElement = element.labels.map(item => {
            return `<span class="text-xs font-bold px-1  text-black bg-[#ebab63] rounded-full">${item}</span>`}).join('');
        
        
        
        const div_card = document.createElement('div');

        if (element.status == 'open') {
            div_card.className = 'space-y-2 p-4 shadow-md show-effect-open';
        }
        else {
            div_card.className = 'space-y-2 p-4 shadow-md show-effect-close';
        }

        div_card.innerHTML = `
        
                    <div class="flex justify-between items-center">
                        <div
                            class="flex items-center justify-center bg-green-200 w-8 h-8 border-2 border-dashed border-green-500 rounded-full">
                            <span class="text-green-500 text-sm"></span>
                        </div>

                        <div class="badge badge-soft badge-secondary">${element.priority}</div>
                    </div>


                    <div>
                        <h2 class="font-bold text-xl py-2">${element.title}</h2>
                        <p class="text-[#64748B] line-clamp-2 ">${element.description}</p>
                    </div>



                    <div class="py-2">
                        <div class="flex gap-3"> ${levelElement}</div>
                    </div>

                    <hr class="border-t border-gray-300 my-4">


                    <div class="text-[#64748B] text-sm space-y-2">
                        <div class="flex justify-between items-center">
                            <p>#${element.id} by john_doe</p>
                            <p>${element.createdAt}</p>
                        </div>

                        <div class="flex justify-between items-center">
                            <p>${element.author}</p>
                            <p>${element.updatedAt}</p>
                        </div>
                        
                    </div>
               
        `;
        cardContainer.appendChild(div_card);
    });
}

async function allIssue() {
    showLoading();
    const response = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await response.json();
    displayIssur(data);
    hiddenLoading();
}



function showLoading() {
    loading.classList.remove('hidden');
    loading.classList.add('flex');
}

function hiddenLoading() {
    loading.classList.add('hidden');
}















allIssue();




