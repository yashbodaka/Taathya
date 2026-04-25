import re

with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

start_marker = '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">'
end_marker = '</section>'

start_idx = text.find(start_marker, text.find('<!-- Property Grid -->'))

# Find the specific </section> that closes the Featured Properties Section
# It is the next </section> after the start_idx
end_idx = text.find(end_marker, start_idx)

if start_idx == -1 or end_idx == -1:
    print("Markers not found!")
    exit(1)

new_grid = '''<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-[1100px] mx-auto relative content-center pb-8">
                <!-- Property Card 1 -->
                <div class="bg-[#fcfafa] flex flex-col rounded-[28px] p-[10px] border-[2px] border-[#f4ebeb] shadow-[0_2px_10px_rgba(140,39,76,0.03)] hover:shadow-[0_20px_40px_rgba(140,39,76,0.12)] hover:-translate-y-1 transition-all duration-500 relative">
                    <!-- Image Area -->
                    <div class="relative h-[280px] rounded-[20px] overflow-hidden mb-4">
                        <!-- Top Left Badge -->
                        <div class="absolute top-0 left-0 bg-[#9c274b] text-white px-4 py-[6px] rounded-br-[16px] text-[13px] font-extrabold font-ui tracking-wide shadow-md z-10">
                            Vaishnodevi
                        </div>
                        <!-- Top Right Overlay text -->
                        <div class="absolute top-[8px] right-[16px] flex items-center gap-1 z-10">
                            <span class="text-[10px] font-extrabold text-gray-900 drop-shadow-sm flex items-center tracking-widest uppercase">✓ LOAN READY</span>
                        </div>
                        <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop" alt="CENTRE COURT BY TROGON" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 relative z-0">
                    </div>

                    <!-- Bottom floating Whatsapp icon -->
                    <a href="#" class="absolute bottom-[20px] right-[4px] w-[52px] h-[52px] bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_8px_20px_rgba(37,211,102,0.35)] hover:scale-110 transition-transform z-20 border-[3px] border-white">
                        <svg viewBox="0 0 24 24" class="w-[26px] h-[26px] fill-current"><path d="M12.031 0C5.39.043 0 5.438 0 12.083c0 2.148.562 4.167 1.547 5.922L0 24l6.17-1.58C7.886 23.36 9.907 23.916 12.03 23.916 18.667 23.916 24 18.575 24 11.97v-.03C24 5.305 18.675 0 12.03 0zm4.27 17.15c-.244.66-1.436 1.282-2.022 1.343-.538.056-1.222.18-3.79-.887-3.08-1.28-5.06-4.453-5.213-4.66-.153-.205-1.246-1.658-1.246-3.167 0-1.506.786-2.25 1.066-2.556.28-.306.613-.385.816-.385.204 0 .41.002.593.01.196.01.46-.076.717.545.267.643.913 2.227.994 2.385.08.158.133.344.032.55-.102.203-.153.33-.306.51-.153.18-.32.396-.46.536-.154.153-.314.32-.136.626.177.306.79 1.31 1.706 2.128 1.18 1.053 2.158 1.378 2.463 1.53.305.154.484.128.663-.076.18-.204.77-1.007.973-1.353.204-.346.408-.288.7-.183.29.103 1.838.866 2.154 1.02.316.153.526.23.606.356.08.128.08.74-.16 1.4z"/></svg>
                    </a>

                    <!-- Texts Container -->
                    <div class="px-[12px] flex flex-col gap-[16px] pb-5">
                        <!-- Title Badge -->
                        <div class="bg-[#f2e7e9] text-[#9c274b] text-center font-extrabold text-[15.5px] py-[14px] rounded-[16px] flex items-center justify-center font-display tracking-widest uppercase leading-none shadow-sm">
                            CENTRE COURT BY TROGON
                        </div>

                        <!-- Type Badges -->
                        <div class="flex justify-center h-[30px] w-full max-w-[280px] mx-auto">
                            <div class="flex w-full bg-[#f6eeef] rounded-full overflow-hidden text-[10px] font-extrabold shadow-sm">
                                <div class="bg-[#9c274b] text-white px-3 flex items-center justify-center tracking-wide w-1/2 border border-[#9c274b] rounded-full z-10 shadow-sm relative right-[-10px]">APARTMENTS</div>
                                <div class="text-[#a1a1a1] px-5 flex items-center justify-center tracking-wide uppercase w-1/2 ml-1 text-[9.5px]">DUPLEX PENTHOUSE</div>
                            </div>
                        </div>

                        <!-- BHK Badge -->
                        <div class="flex justify-center mt-[-8px]">
                            <div class="border border-[#ebd9dd] text-[#9c274b] px-5 py-[4px] rounded-full text-[10px] font-extrabold bg-white shadow-sm tracking-widest">
                                4 BHK
                            </div>
                        </div>

                        <!-- Price & Area Box -->
                        <div class="border border-[#f0e8eb] rounded-[12px] flex items-center justify-between shadow-[0_2px_8px_rgba(0,0,0,0.02)] bg-white h-[74px] px-2 mb-1 mt-1">
                            <!-- Price -->
                            <div class="flex flex-col items-center justify-center flex-1 h-full relative">
                                <div class="text-[18px] font-[800] font-display text-gray-900 leading-none">3.48 Cr</div>
                                <div class="text-[9px] font-bold text-[#808080] mt-[8px] uppercase tracking-[0.15em]">BOX PRICE</div>
                            </div>
                            <!-- Divider -->
                            <div class="w-[1px] h-[40px] bg-[#f0e8eb]"></div>
                            <!-- Area -->
                            <div class="flex flex-col items-center justify-center flex-1 h-full relative">
                                <div class="text-[17px] font-[800] font-display text-gray-900 leading-none">4264 <span class="text-[11px] font-semibold text-gray-500 font-ui ml-[2px]">SQ.FT</span></div>
                                <div class="text-[10.5px] font-medium text-[#808080] mt-[7px] tracking-wide">SuperBuilt-up</div>
                            </div>
                        </div>

                        <!-- Features List -->
                        <ul class="flex flex-col gap-[9px] mt-[4px] px-1 pb-4 w-full">
                            <li class="flex items-start gap-2 text-[13px] text-[#4d4d4d] font-semibold font-body tracking-tight leading-snug">
                                <span class="text-[#9c274b] text-[12px] relative top-[1px]">★</span> Prime Location on Vaishnodevi Junction
                            </li>
                            <li class="flex items-start gap-2 text-[13px] text-[#4d4d4d] font-semibold font-body tracking-tight leading-snug">
                                <span class="text-[#9c274b] text-[12px] relative top-[1px]">★</span> 30+ Club Class Amenities
                            </li>
                            <li class="flex items-start gap-2 text-[13px] text-[#4d4d4d] font-semibold font-body tracking-tight leading-snug">
                                <span class="text-[#9c274b] text-[12px] relative top-[1px]">★</span> 3-4 Alloted Car Parking
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Property Card 2 -->
                <div class="bg-[#fcfafa] flex flex-col rounded-[28px] p-[10px] border-[2px] border-[#f4ebeb] shadow-[0_2px_10px_rgba(140,39,76,0.03)] hover:shadow-[0_20px_40px_rgba(140,39,76,0.12)] hover:-translate-y-1 transition-all duration-500 relative">
                    <!-- Image -->
                    <div class="relative h-[280px] rounded-[20px] overflow-hidden mb-4 bg-gray-100">
                        <div class="absolute top-0 left-0 bg-[#9c274b] text-white px-4 py-[6px] rounded-br-[16px] text-[13px] font-extrabold font-ui tracking-wide shadow-md z-10">
                            Gift City
                        </div>
                        <div class="absolute top-[8px] right-[16px] flex items-center gap-1 z-10">
                            <span class="text-[10px] font-extrabold text-gray-900 drop-shadow-sm flex items-center tracking-widest uppercase">✓ LOAN READY</span>
                        </div>
                        <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop" alt="SIBAN" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 relative z-0">
                    </div>
                    <!-- Whatsapp -->
                    <a href="#" class="absolute bottom-[20px] right-[4px] w-[52px] h-[52px] bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_8px_20px_rgba(37,211,102,0.35)] hover:scale-110 transition-transform z-20 border-[3px] border-white">
                        <svg viewBox="0 0 24 24" class="w-[26px] h-[26px] fill-current"><path d="M12.031 0C5.39.043 0 5.438 0 12.083c0 2.148.562 4.167 1.547 5.922L0 24l6.17-1.58C7.886 23.36 9.907 23.916 12.03 23.916 18.667 23.916 24 18.575 24 11.97v-.03C24 5.305 18.675 0 12.03 0zm4.27 17.15c-.244.66-1.436 1.282-2.022 1.343-.538.056-1.222.18-3.79-.887-3.08-1.28-5.06-4.453-5.213-4.66-.153-.205-1.246-1.658-1.246-3.167 0-1.506.786-2.25 1.066-2.556.28-.306.613-.385.816-.385.204 0 .41.002.593.01.196.01.46-.076.717.545.267.643.913 2.227.994 2.385.08.158.133.344.032.55-.102.203-.153.33-.306.51-.153.18-.32.396-.46.536-.154.153-.314.32-.136.626.177.306.79 1.31 1.706 2.128 1.18 1.053 2.158 1.378 2.463 1.53.305.154.484.128.663-.076.18-.204.77-1.007.973-1.353.204-.346.408-.288.7-.183.29.103 1.838.866 2.154 1.02.316.153.526.23.606.356.08.128.08.74-.16 1.4z"/></svg>
                    </a>

                    <!-- Texts Container -->
                    <div class="px-[12px] flex flex-col gap-[16px] pb-5">
                        <!-- Title Badge -->
                        <div class="bg-[#f2e7e9] text-[#9c274b] text-center font-extrabold text-[15.5px] py-[14px] rounded-[16px] flex items-center justify-center font-display tracking-widest uppercase leading-none shadow-sm">
                            SIBAN
                        </div>

                        <!-- Type Badges -->
                        <div class="flex justify-center h-[30px] w-full max-w-[280px] mx-auto">
                            <div class="flex w-full bg-[#f6eeef] rounded-full overflow-hidden text-[10px] font-extrabold shadow-sm">
                                <div class="bg-[#9c274b] text-white px-3 flex items-center justify-center tracking-wide w-[55%] border border-[#9c274b] rounded-full z-10 shadow-sm relative right-[-10px]">APARTMENTS</div>
                                <div class="text-[#a1a1a1] px-5 flex items-center justify-center tracking-wide uppercase w-[45%] ml-1 text-[9.5px]">PENTHOUSE</div>
                            </div>
                        </div>

                        <!-- BHK Badge -->
                        <div class="flex justify-center mt-[-8px]">
                            <div class="border border-[#ebd9dd] text-[#9c274b] px-4 py-[4px] rounded-full text-[10px] font-extrabold bg-white shadow-sm tracking-widest">
                                2.5 BHK
                            </div>
                        </div>

                        <!-- Price & Area Box -->
                        <div class="border border-[#f0e8eb] rounded-[12px] flex items-center justify-between shadow-[0_2px_8px_rgba(0,0,0,0.02)] bg-white h-[74px] px-2 mb-1 mt-1">
                            <!-- Price -->
                            <div class="flex flex-col items-center justify-center flex-1 h-full relative">
                                <div class="text-[18px] font-[800] font-display text-gray-900 leading-none">65 Lacs</div>
                                <div class="text-[9px] font-bold text-[#808080] mt-[8px] uppercase tracking-[0.15em]">BOX PRICE</div>
                            </div>
                            <!-- Divider -->
                            <div class="w-[1px] h-[40px] bg-[#f0e8eb]"></div>
                            <!-- Area -->
                            <div class="flex flex-col items-center justify-center flex-1 h-full relative">
                                <div class="text-[17px] font-[800] font-display text-gray-900 leading-none">2200 <span class="text-[11px] font-semibold text-gray-500 font-ui ml-[2px]">SQ.FT</span></div>
                                <div class="text-[10.5px] font-medium text-[#808080] mt-[7px] capitalize">Carpet</div>
                            </div>
                        </div>

                        <!-- Features List -->
                        <ul class="flex flex-col gap-[9px] mt-[4px] px-1 pb-4 w-full">
                            <li class="flex items-start gap-2 text-[13px] text-[#4d4d4d] font-semibold font-body tracking-tight leading-snug">
                                <span class="text-[#9c274b] text-[12px] relative top-[1px]">★</span> 60+ Amenities
                            </li>
                            <li class="flex items-start gap-2 text-[13px] text-[#4d4d4d] font-semibold font-body tracking-tight leading-snug">
                                <span class="text-[#9c274b] text-[12px] relative top-[1px]">★</span> 35 Storeys Tower
                            </li>
                            <li class="flex items-start gap-2 text-[13px] text-[#4d4d4d] font-semibold font-body tracking-tight leading-snug">
                                <span class="text-[#9c274b] text-[12px] relative top-[1px]">★</span> 3 Road Corner Project
                            </li>
                            <li class="flex items-start gap-2 text-[13px] text-[#4d4d4d] font-semibold font-body tracking-tight leading-snug">
                                <span class="text-[#9c274b] text-[12px] relative top-[1px]">★</span> IGBC Platinum Certified
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Property Card 3 -->
                <div class="bg-[#fcfafa] flex flex-col rounded-[28px] p-[10px] border-[2px] border-[#f4ebeb] shadow-[0_2px_10px_rgba(140,39,76,0.03)] hover:shadow-[0_20px_40px_rgba(140,39,76,0.12)] hover:-translate-y-1 transition-all duration-500 relative">
                    <!-- Image -->
                    <div class="relative h-[280px] rounded-[20px] overflow-hidden mb-4 bg-gray-100">
                        <div class="absolute top-0 left-0 bg-[#9c274b] text-white px-4 py-[6px] rounded-br-[16px] text-[13px] font-extrabold font-ui tracking-wide shadow-md z-10">
                            Gift City
                        </div>
                        <div class="absolute top-[8px] right-[16px] flex items-center gap-1 z-10">
                            <span class="text-[10px] font-extrabold text-gray-900 drop-shadow-sm flex items-center tracking-widest uppercase">✓ LOAN READY</span>
                        </div>
                        <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop" alt="REVA" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 relative z-0">
                    </div>
                    <!-- Whatsapp -->
                    <a href="#" class="absolute bottom-[20px] right-[4px] w-[52px] h-[52px] bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_8px_20px_rgba(37,211,102,0.35)] hover:scale-110 transition-transform z-20 border-[3px] border-white">
                        <svg viewBox="0 0 24 24" class="w-[26px] h-[26px] fill-current"><path d="M12.031 0C5.39.043 0 5.438 0 12.083c0 2.148.562 4.167 1.547 5.922L0 24l6.17-1.58C7.886 23.36 9.907 23.916 12.03 23.916 18.667 23.916 24 18.575 24 11.97v-.03C24 5.305 18.675 0 12.03 0zm4.27 17.15c-.244.66-1.436 1.282-2.022 1.343-.538.056-1.222.18-3.79-.887-3.08-1.28-5.06-4.453-5.213-4.66-.153-.205-1.246-1.658-1.246-3.167 0-1.506.786-2.25 1.066-2.556.28-.306.613-.385.816-.385.204 0 .41.002.593.01.196.01.46-.076.717.545.267.643.913 2.227.994 2.385.08.158.133.344.032.55-.102.203-.153.33-.306.51-.153.18-.32.396-.46.536-.154.153-.314.32-.136.626.177.306.79 1.31 1.706 2.128 1.18 1.053 2.158 1.378 2.463 1.53.305.154.484.128.663-.076.18-.204.77-1.007.973-1.353.204-.346.408-.288.7-.183.29.103 1.838.866 2.154 1.02.316.153.526.23.606.356.08.128.08.74-.16 1.4z"/></svg>
                    </a>

                    <!-- Texts Container -->
                    <div class="px-[12px] flex flex-col gap-[16px] pb-5">
                        <!-- Title Badge -->
                        <div class="bg-[#f2e7e9] text-[#9c274b] text-center font-extrabold text-[15.5px] py-[14px] rounded-[16px] flex items-center justify-center font-display tracking-widest uppercase leading-none shadow-sm">
                            REVA
                        </div>

                        <!-- Type Badges -->
                        <div class="flex justify-center h-[30px] w-full max-w-[280px] mx-auto">
                            <div class="flex w-full bg-[#f6eeef] rounded-full overflow-hidden text-[10px] font-extrabold shadow-sm">
                                <div class="bg-[#9c274b] text-white px-3 flex items-center justify-center tracking-wide w-[55%] border border-[#9c274b] rounded-full z-10 shadow-sm relative right-[-10px]">APARTMENTS</div>
                                <div class="text-[#a1a1a1] px-5 flex items-center justify-center tracking-wide uppercase w-[45%] ml-1 text-[9.5px]">DUPLEX</div>
                            </div>
                        </div>

                        <!-- BHK Badge -->
                        <div class="flex justify-center mt-[-8px]">
                            <div class="border border-[#ebd9dd] text-[#9c274b] px-6 py-[4px] rounded-full text-[10px] font-extrabold bg-white shadow-sm tracking-widest">
                                FLATS
                            </div>
                        </div>

                        <!-- Price & Area Box -->
                        <div class="border border-[#f0e8eb] rounded-[12px] flex items-center justify-between shadow-[0_2px_8px_rgba(0,0,0,0.02)] bg-white h-[74px] px-2 mb-1 mt-1">
                            <!-- Price -->
                            <div class="flex flex-col items-center justify-center flex-1 h-full relative px-1">
                                <div class="text-[14px] font-[800] font-display text-gray-900 leading-none whitespace-nowrap">Price on Call</div>
                                <div class="text-[9px] font-bold text-[#808080] mt-[8px] uppercase tracking-[0.15em]">BOX PRICE</div>
                            </div>
                            <!-- Divider -->
                            <div class="w-[1px] h-[40px] bg-[#f0e8eb]"></div>
                            <!-- Area -->
                            <div class="flex flex-col items-center justify-center flex-1 h-full relative px-1">
                                <div class="text-[15px] font-[800] font-display text-gray-900 leading-none flex items-baseline whitespace-nowrap">822 - 2075 <span class="text-[9.5px] font-semibold text-gray-500 font-ui ml-[1px]">SQ.FT</span></div>
                                <div class="text-[10.5px] font-medium text-[#808080] mt-[7px] tracking-wide capitalize">SuperBuilt-up</div>
                            </div>
                        </div>

                        <!-- Features List -->
                        <ul class="flex flex-col gap-[9px] mt-[4px] px-1 pb-4 w-full">
                            <li class="flex items-start gap-2 text-[13px] text-[#4d4d4d] font-semibold font-body tracking-tight leading-snug">
                                <span class="text-[#9c274b] text-[12px] relative top-[1px]">★</span> Tallest Residential Tower in Gift City
                            </li>
                            <li class="flex items-start gap-2 text-[13px] text-[#4d4d4d] font-semibold font-body tracking-tight leading-snug">
                                <span class="text-[#9c274b] text-[12px] relative top-[1px]">★</span> 35 Storey Project
                            </li>
                            <li class="flex items-start gap-2 text-[13px] text-[#4d4d4d] font-semibold font-body tracking-tight leading-snug">
                                <span class="text-[#9c274b] text-[12px] relative top-[1px]">★</span> Prime Location
                            </li>
                            <li class="flex items-start gap-2 text-[13px] text-transparent font-semibold font-body py-[2px] select-none pointer-events-none">
                                <span class="text-transparent text-[12px]">★</span> .
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- End Property Grid -->
</div>
'''

new_text = text[:start_idx] + new_grid + "\n    " + text[end_idx:]

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_text)

print("Updated index.html successfully")