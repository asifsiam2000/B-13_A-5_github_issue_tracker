const cardContainer = document.getElementById('card-container');
const loading = document.getElementById('loading');
const cntIssue = document.getElementById('cnt-issue');

const allBtn = document.getElementById('all-btn');
const openBtn = document.getElementById('open-btn');
const closeBtn = document.getElementById('close-btn');

const modalDiv = document.getElementById('my_modal_1');

let arr = [];


function ShowLengthOfData(len) {
    cntIssue.innerText = len;
}


// display issues
function displayIssur(data) {

    cardContainer.innerHTML = '';

    if(data.length === 0){
        cardContainer.innerHTML = `
        <div class="col-span-full text-center py-10 text-gray-400">
        No Issues Found
        </div>
        `;
        return;
    }

    data.forEach(element => {

        const levelElement = element.labels.map(item => {
            return `<span class="text-xs font-bold px-1  text-black bg-[#ebab63] rounded-full">${item}</span>`
        }).join('');


        const div_card = document.createElement('div');

        div_card.className =
        `flex flex-col justify-between p-4 shadow-md rounded-lg hover:shadow-xl transition duration-200 
        ${element.status === 'open' ? 'show-effect-open' : 'show-effect-close'}`;


        div_card.innerHTML = `

        <div onclick="openModal(${element.id})" class="flex justify-between items-center cursor-pointer">

            <div class="flex items-center justify-center bg-green-200 w-8 h-8 border-2 border-dashed border-green-500 rounded-full">
                <span class="text-green-500 text-sm"></span>
            </div>

            <div class="badge badge-soft badge-secondary">
                ${element.priority}
            </div>

        </div>


        <div onclick="openModal(${element.id})" class="cursor-pointer">

            <h2 class="font-bold text-lg py-2 line-clamp-2">
                ${element.title}
            </h2>

            <p class="text-[#64748B] text-sm line-clamp-2">
                ${element.description}
            </p>

        </div>


        <div onclick="openModal(${element.id})" class="py-3">
            <div class="flex flex-wrap gap-2">
                ${levelElement}
            </div>
        </div>

        <hr class="border-t-2 border-gray-300">

        <div onclick="openModal(${element.id})" class="text-[#64748B] text-xs space-y-2 py-3">

            <div class="flex justify-between">
                <p>#${element.id} by ${element.author}</p>
                <p>${element.createdAt}</p>
            </div>

            <div class="flex justify-between text-xs gap-2">
                <p>Assignee:${element.assignee}</p>
                <p>Updated ${element.updatedAt}</p>
            </div>

        </div>
        `;

        cardContainer.appendChild(div_card);
    });
}



// modal
async function openModal(id) {

    showLoading();

    const response = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
    const data = await response.json();

    const issue = data.data;

    const levelElement = issue.labels.map(item => {
        return `<span class="text-xs font-bold px-1 text-black bg-[#ebab63] rounded-full">${item}</span>`
    }).join('');



    modalDiv.innerHTML = `

    <div class="modal-box w-full max-w-xl">

        <div class="space-y-4">

            <h2 class="font-bold text-xl sm:text-2xl">
            ${issue.title}
            </h2>

            <div class="flex flex-wrap gap-2 items-center">

                <span class="font-bold px-3 text-white bg-[#00A96E] rounded-full">
                ${issue.status}
                </span>

                <p class="text-[#64748B] text-xs">
                ${issue.status} by ${issue.author}
                </p>

                <p class="text-[#64748B] text-xs">
                ${issue.updatedAt}
                </p>

            </div>

            <div class="flex flex-wrap gap-2">
                ${levelElement}
            </div>

            <p class="text-[#64748B] text-sm leading-relaxed">
                ${issue.description}
            </p>


            <div class="bg-base-200 rounded-lg flex flex-col sm:flex-row justify-between gap-4 p-5">

                <div>
                    <p class="text-[#64748B] text-sm">Assignee:</p>
                    <p class="font-bold">${issue.assignee}</p>
                </div>

                <div>
                    <p class="text-[#64748B] text-sm">Priority</p>
                    <p class="bg-red-500 px-3 rounded-full text-white w-fit">
                    ${issue.priority}
                    </p>
                </div>

            </div>

        </div>

        <div class="modal-action">

            <form method="dialog">
                <button class="btn btn-primary">
                Close
                </button>
            </form>

        </div>

    </div>
    `;


    modalDiv.showModal();

    hiddenLoading();
}



// fetch all issues
async function allIssue(){

    showLoading();

    const response = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await response.json();

    arr = data.data;

    displayIssur(arr);
    ShowLengthOfData(arr.length);

    hiddenLoading();
}



// filter buttons

async function showAll(id){

    showLoading();

    await new Promise(resolve => setTimeout(resolve, 300));

    let filtered = arr;

    if (id === 'open-btn') {
        filtered = arr.filter(item => item.status === 'open');
    }

    if(id === 'close-btn'){
        filtered = arr.filter(item => item.status === 'closed');
    }

    if(id === 'all-btn'){
        filtered = arr;
    }

    displayIssur(filtered);
    ShowLengthOfData(filtered.length);

    allBtn.classList.remove('btn-active','btn-primary');
    openBtn.classList.remove('btn-active','btn-primary');
    closeBtn.classList.remove('btn-active','btn-primary');

    document.getElementById(id).classList.add('btn-active','btn-primary');

    hiddenLoading();
}



// loading
function showLoading(){
    loading.classList.remove('hidden');
    loading.classList.add('flex');
}

function hiddenLoading(){
    loading.classList.add('hidden');
}



// search
document.getElementById('btn-search').addEventListener('click', async function(){

    const input = document.getElementById('input-search');

    const value = input.value.trim().toLowerCase();

    showLoading();

    const response = await fetch(
        `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${value}`
    );

    const data = await response.json();

    const result = data.data.filter(item => item.title.trim().toLowerCase().includes(value));

    displayIssur(result);
    ShowLengthOfData(result.length);

    hiddenLoading();
});



allIssue();