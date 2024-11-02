const loadingData = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/ai/tools');
    const data = await res.json();
    const tools = data.data.tools;
    displayshow(tools, 6); // Show only 6 items initially

    // Event listener for "See More" button
    const seeMoreButton = document.getElementById('morebutton');
    seeMoreButton.addEventListener('click', () => {
        displayshow(tools); // Show all items when button is clicked
        seeMoreButton.style.display = 'none'; // Hide the "See More" button
    });
}

loadingData();

const displayshow = (tools, limit = tools.length) => {
    const carddiv = document.getElementById('min-contains');
    carddiv.innerHTML = ''; // Clear existing content

    // Slice the array to show only the specified number of items
    tools.slice(0, limit).forEach(item => {
        const maincontain = document.createElement('div');
        maincontain.classList = `p-[25px] border-2 border-[#796c6c] rounded-[16px]`;
        
        const featureList = item.features.map((feature, index) => 
            `<li class="text-[16px] text-[#585858]">${index + 1}. ${feature}</li>`
        ).join('');
        
        maincontain.innerHTML = `
            <figure>
                <img src="${item.image}" alt="" class="w-full rounded-[16px]">
            </figure>
            <div class="py-[25px]">
                <h3 class="text-[24px] font-semibold text-[#111111]">Features</h3> 
                <ul>${featureList}</ul>
            </div>
            <hr class="w-[430px]"/>
            <div class="py-[25px] flex justify-between items-center">
                <div>
                    <h3 class="text-[24px] font-semibold text-[#111111] pb-[16px]">${item.name}</h3>
                    <i class="fa-solid fa-calendar-days pr-2"></i><span class="text-[16px] text-[#585858]">${item.published_in}</span>
                </div>
                <div class="w-[50px] h-[50px] rounded-full bg-[#FEF7F7] flex justify-center items-center duration-700 ease-in-out hover:border-2 border-black">
                 <button onclick="handleShowDetail('${item.id}')"><i class="fa-solid fa-arrow-right"></i></button>
                </div>
            </div>
        `;
        carddiv.appendChild(maincontain);
    });
}
const handleShowDetail = async (id) => {
    // console.log('clicked show details', id)
    // load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
    const data = await res.json();
    const phone = data.data;
    showPhoneDetails(phone);
    
    
}

const showPhoneDetails = (phone) => {
    console.log(phone);
  
    const maindivs = document.getElementById('sobdhukabo');
    maindivs.textContent = ''; // Clear existing content
  
    const phonedetaladd = document.createElement('div');
    phonedetaladd.classList = `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2`;
  
    // Generate dynamic list items for features, integrations, and pricing
    const featuresList = phone.features
      ? Object.values(phone.features).map(feature => `<li class="text-[16px] text-[#585858] font-medium">${feature.feature_name}: ${feature.description}</li>`).join('')
      : '<li class="text-[16px] text-[#585858] font-medium">No features available</li>';
  
    const integrationsList = Array.isArray(phone.integrations)
      ? phone.integrations.map(integration => `<li class="text-[16px] text-[#585858] font-medium">${integration}</li>`).join('')
      : '<li class="text-[16px] text-[#585858] font-medium">No integrations available</li>';
  
    const pricingCards = Array.isArray(phone.pricing)
      ? phone.pricing.map(plan => `
          <div class="py-[25px]">
            <div class="w-[132px] h-[100px] bg-[#ffff] rounded-[16px] p-[22px] flex items-center justify-center">
              <h4 class="text-[16px] text-[#03A30A] font-bold">${plan.price} ${plan.plan}</h4>
            </div>
          </div>
        `).join('')
      : '<div class="text-[16px] text-[#585858] font-medium">No pricing information available</div>';
  
    const images = Array.isArray(phone.image_link) && phone.image_link.length > 0
      ? `<img src="${phone.image_link[0]}" alt="Product Image" class="w-full h-auto">`
      : '<img src="default-image.png" alt="Default Image" class="w-full h-auto">';
  
    // Populate the inner HTML with dynamic data
    phonedetaladd.innerHTML = `
      <div class="border-2 border-black p-[30px] bg-[#edb3b3]">
        <h2 class="text-[30px] font-bold">${phone.tool_name}</h2>
        <p class="text-[25px] text-[#111111] font-bold">${phone.description || "No description available"}</p>
        <p class="text-[16px] text-[#111111] font-medium mt-2">Accuracy: ${phone.accuracy?.description || "No accuracy info"} (Score: ${phone.accuracy?.score || "N/A"})</p>
  
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          ${pricingCards}
        </div>
  
        <div class="flex justify-between mt-4">
          <div>
            <h2 class="text-[25px] text-[#111111] font-bold">Features</h2>
            <ul class="list-disc ml-8">
              ${featuresList}
            </ul>
          </div>
          <div>
            <h2 class="text-[25px] text-[#111111] font-bold">Integrations</h2>
            <ul class="list-disc ml-5">
              ${integrationsList}
            </ul>
          </div>
        </div>
      </div>
      <div>
        ${images}
      </div>
    `;
  
    // Append the new div to the main container
    maindivs.appendChild(phonedetaladd);
  
    // Show the modal
    show_details_model.showModal();
  };
  