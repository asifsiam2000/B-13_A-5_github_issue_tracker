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


function displayIssur(data) {
    cardContainer.innerHTML = '';


    data.forEach(element => {
        
        const levelElement = element.labels.map(item => {
            return `<span class="text-xs font-bold px-1  text-black bg-[#ebab63] rounded-full">${item}</span>`}).join('');
    
        const div_card = document.createElement('div');

        if (element.status == 'open') {
            div_card.className = 'flex flex-col justify-between p-4 shadow-md show-effect-open h-full';
        }
        else {
            div_card.className = 'flex flex-col justify-between p-4 shadow-md show-effect-close h-full';
        }

        div_card.innerHTML = `
        
                    <div onclick="openModal(${element.id})"  class="flex justify-between items-center">
                        <div
                            class="flex items-center justify-center bg-green-200 w-8 h-8 border-2 border-dashed border-green-500 rounded-full">
                            <span class="text-green-500 text-sm"></span>
                        </div>

                        <div class="badge badge-soft badge-secondary">${element.priority}</div>
                    </div>


                    <div onclick="openModal(${element.id})"  >
                        <h2 onclick="openModal(${element.id})" class="font-bold text-xl py-2">${element.title}</h2>
                        <p onclick="openModal(${element.id})"  class="text-[#64748B] line-clamp-2 ">${element.description}</p>
                    </div>



                    <div onclick="openModal(${element.id})"  class="py-3">
                        <div class="flex gap-3"> ${levelElement}</div>
                    </div>

                    <hr onclick="openModal(${element.id})" class="border-t-2 border-gray-300 ">


                    <div onclick="openModal(${element.id})"  class="text-[#64748B] text-sm space-y-2 py-3">
                        <div class="flex justify-between items-center">
                            <p class="text-xs">#${element.id} by john_doe</p>
                            <p class="text-xs">${element.createdAt}</p>
                        </div>

                        <div class="flex justify-between items-center">
                            <p class="text-xs">${element.author}</p>
                            <p class="text-xs">Updated ${ element.updatedAt}</p>
                        </div>
                        
                    </div>
               
        `;
        cardContainer.appendChild(div_card);
    });
}


async function openModal(id) {
    showLoading();
    const response = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
    const data = await response.json();
    const allData = data.data;

    const levelElement = allData.labels.map(item => {
        return `<span class="text-xs font-bold px-1 text-black bg-[#ebab63] rounded-full">${item}</span>`
    }).join('');

    modalDiv.innerHTML = `
        <div class="modal-box">
            <div class="space-y-4">
                <h2 class="font-bold text-2xl">${allData.title}</h2>

                <div class="flex gap-1 items-center">
                    <span class="font-bold  px-3 text-white bg-[#00A96E] rounded-full">${allData.status}</span>
                    <p class="text-[#64748B] text-xs"><i class="fa-solid fa-dot"></i> ${allData.status} by ${allData.author}</p>
                    <p class="text-[#64748B] text-xs"><i class="fa-solid fa-dot"></i> ${allData.updatedAt}</p>
                </div>

                <div class="flex gap-3">
                    ${levelElement}
                </div>

                <p class="text-[#64748B]">${allData.description}</p>

                <div class="bg-base-200 rounded-lg flex gap-40 p-5">
                    <div>
                        <p class="text-[#64748B]  py-1">Assignee:</p>
                        <p class="font-bold  ">${allData.assignee}</p>
                    </div>
                    <div>
                        <p class="text-[#64748B] py-2">Priority:</p>
                        <p class="bg-red-500 px-2 rounded-full text-center text-white">${allData.priority}</p>
                    </div>
                </div>
            </div>

            <div class="modal-action">
                <form method="dialog">
                    <button class="btn btn-primary">Close</button>
                </form>
            </div>
        </div>
    `;

    modalDiv.showModal();
     hiddenLoading();
}

async function allIssue() {
    showLoading();

    const response = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await response.json();
    arr = data.data;
    displayIssur(arr);
    ShowLengthOfData(arr.length);
    hiddenLoading();
}

function showAll(id) {
    
    if (id == 'all-btn') {
        allBtn.classList.add('btn-active' , 'btn-primary');
        openBtn.classList.remove('btn-active' , 'btn-primary');
        closeBtn.classList.remove('btn-active', 'btn-primary');
        showLoading();
        displayIssur(arr);
        ShowLengthOfData(arr.length);
        hiddenLoading();
    }
    else if (id == 'open-btn') {
        const filterArr = arr.filter(item => item.status == 'open');
        allBtn.classList.remove('btn-active' , 'btn-primary');
        openBtn.classList.add('btn-active' , 'btn-primary');
        closeBtn.classList.remove('btn-active', 'btn-primary');
        showLoading();
        displayIssur(filterArr);
        ShowLengthOfData(filterArr.length);
        hiddenLoading();
    }
    else {
        
        const filterArr = arr.filter(item => item.status == 'closed');
        allBtn.classList.remove('btn-active' , 'btn-primary');
        openBtn.classList.remove('btn-active' , 'btn-primary');
        closeBtn.classList.add('btn-active', 'btn-primary');
        showLoading();
        displayIssur(filterArr);
        ShowLengthOfData(filterArr.length);
        console.log(filterArr.length);
        hiddenLoading();
    }
     
 }


function showLoading() {
    loading.classList.remove('hidden');
    loading.classList.add('flex');
}

function hiddenLoading() {
    loading.classList.add('hidden');
}

document.getElementById('btn-search').addEventListener('click', async function () {

    const input = document.getElementById('input-search');
    const searchValue = input.value.trim().toLowerCase();
     showLoading();
    const response = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`);

    const data = await response.json();

    const allData = data.data;

    displayIssur(allData);
    ShowLengthOfData(allData.length);
     hiddenLoading();
});

                            //   working start this section 

allIssue();




