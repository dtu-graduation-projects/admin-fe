<template>
    <div class="col-span-6 sm:col-span-3 xl:col-span-2 flex flex-col justify-end items-center" v-if="loadingIconAction">
        <LoadingIcon icon="ball-triangle" class="w-20 h-20" />
    </div>
    <div class="grid grid-cols-12 gap-6" v-else>
        <div class="col-span-12 2xl:col-span-9">
            <div class="grid grid-cols-12 gap-6">
                <!-- BEGIN: General Report -->
                <div class="col-span-12 mt-8">
                    <div class="intro-y flex items-center h-10">
                        <h2 class="text-lg font-medium truncate mr-5">General Report</h2>
                        <a href="" class="ml-auto flex items-center text-primary"> <RefreshCcwIcon class="w-4 h-4 mr-3" /> Reload Data </a>
                    </div>
                    <div class="grid grid-cols-12 gap-6 mt-5">
                        <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                            <div class="report-box zoom-in">
                                <div class="box p-5">
                                    <div class="flex">
                                        <ShoppingCartIcon class="report-box__icon text-primary" />
                                        <div class="ml-auto">
                                            <Tippy
                                                tag="div"
                                                class="report-box__indicator cursor-pointer"
                                                :class="{'bg-success' : checkItemSalse() > 0, 'bg-danger' : checkItemSalse() < 0, 'bg-slate-500' : checkItemSalse() == 0, }"
                                                :content="percentItemSales"
                                            >
                                                {{checkItemSalse()}}% <ChevronUpIcon class="w-4 h-4 ml-0.5" v-if="checkItemSalse() > 0" />
                                                <ChevronRightIcon class="w-4 h-4 ml-0.5" v-if="checkItemSalse() == 0" />
                                                <ChevronDownIcon class="w-4 h-4 ml-0.5" v-if="checkItemSalse() < 0" />
                                            </Tippy>
                                        </div>
                                    </div>
                                    <div class="text-3xl font-medium leading-8 mt-6">{{soldProduct}}</div>
                                    <div class="text-base text-slate-500 mt-1">Item Sales</div>
                                </div>
                            </div>
                        </div>
                        <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                            <div class="report-box zoom-in">
                                <div class="box p-5">
                                    <div class="flex">
                                        <CreditCardIcon class="report-box__icon text-pending" />
                                        <div class="ml-auto">
                                            <Tippy
                                                tag="div"
                                                class="report-box__indicator cursor-pointer"
                                                :class="{'bg-success' : checkCreateOrder() > 0, 'bg-danger' : checkCreateOrder() < 0, 'bg-slate-500' : checkCreateOrder() == 0, }"
                                                :content="percentOrder"
                                            >
                                                {{checkCreateOrder()}}% <ChevronUpIcon class="w-4 h-4 ml-0.5" v-if="checkCreateOrder() > 0" />
                                                <ChevronRightIcon class="w-4 h-4 ml-0.5" v-if="checkCreateOrder() == 0" />
                                                <ChevronDownIcon class="w-4 h-4 ml-0.5" v-if="checkCreateOrder() < 0" />
                                            </Tippy>
                                        </div>
                                    </div>
                                    <div class="text-3xl font-medium leading-8 mt-6">{{totalOrder}}</div>
                                    <div class="text-base text-slate-500 mt-1">Total Orders</div>
                                </div>
                            </div>
                        </div>
                        <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                            <div class="report-box zoom-in">
                                <div class="box p-5">
                                    <div class="flex">
                                        <MonitorIcon class="report-box__icon text-warning" />
                                        <div class="ml-auto">
                                            <Tippy
                                                tag="div"
                                                class="report-box__indicator cursor-pointer"
                                                :class="{'bg-success' : checkCreateProduct() > 0, 'bg-danger' : checkCreateProduct() < 0, 'bg-slate-500' : checkCreateProduct() == 0, }"
                                                :content="percentProduct"
                                            >
                                                {{checkCreateProduct()}}% <ChevronUpIcon class="w-4 h-4 ml-0.5" v-if="checkCreateProduct() > 0" />
                                                <ChevronRightIcon class="w-4 h-4 ml-0.5" v-if="checkCreateProduct() == 0" />
                                                <ChevronDownIcon class="w-4 h-4 ml-0.5" v-if="checkCreateProduct() < 0" />
                                            </Tippy>
                                        </div>
                                    </div>
                                    <div class="text-3xl font-medium leading-8 mt-6">{{quantityProduct}}</div>
                                    <div class="text-base text-slate-500 mt-1">Total Products</div>
                                </div>
                            </div>
                        </div>
                        <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                            <div class="report-box zoom-in">
                                <div class="box p-5">
                                    <div class="flex">
                                        <UserIcon class="report-box__icon text-success" />
                                        <div class="ml-auto">
                                            <Tippy
                                                tag="div"
                                                class="report-box__indicator cursor-pointer"
                                                :class="{'bg-success' : checkCreateUser() > 0, 'bg-danger' : checkCreateUser() < 0, 'bg-slate-500' : checkCreateUser() == 0, }"
                                                :content="percentUser"
                                            >
                                                {{checkCreateUser()}}% <ChevronUpIcon class="w-4 h-4 ml-0.5" v-if="checkCreateUser() > 0" />
                                                <ChevronRightIcon class="w-4 h-4 ml-0.5" v-if="checkCreateUser() == 0" />
                                                <ChevronDownIcon class="w-4 h-4 ml-0.5" v-if="checkCreateUser() < 0" />
                                            </Tippy>
                                        </div>
                                    </div>
                                    <div class="text-3xl font-medium leading-8 mt-6">{{totalUser}}</div>
                                    <div class="text-base text-slate-500 mt-1">Total User</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- END: General Report -->
                <!-- BEGIN: Sales Report -->
                <div class="col-span-12 lg:col-span-6 mt-8">
                    <div class="intro-y block sm:flex items-center h-10">
                        <h2 class="text-lg font-medium truncate mr-5">Sales Report</h2>
                        <div class="sm:ml-auto mt-3 sm:mt-0 relative text-slate-500">
                            <CalendarIcon class="w-4 h-4 z-10 absolute my-auto inset-y-0 ml-3 left-0" />
                            <Litepicker
                                v-model="salesReportFilter"
                                :options="{
                                    autoApply: false,
                                    singleMode: false,
                                    numberOfColumns: 2,
                                    numberOfMonths: 2,
                                    showWeekNumbers: true,
                                    dropdowns: {
                                        minYear: 1990,
                                        maxYear: null,
                                        months: true,
                                        years: true,
                                    },
                                    }"
                                class="form-control sm:w-56 box pl-10"
                            />
                        </div>
                    </div>
                    <div class="intro-y box p-5 mt-12 sm:mt-5">
                        <div class="flex flex-col md:flex-row md:items-center mt-4 mb-8">
                            <div class="flex">
                                <div>
                                    <div class="text-primary dark:text-slate-300 text-lg xl:text-xl font-medium">
                                        {{formatPrice(currentPriceTotal)}}
                                    </div>
                                    <div class="mt-0.5 text-slate-500">This Month</div>
                                </div>
                                <div class="w-px h-12 border border-r border-dashed border-slate-200 dark:border-darkmode-300 mx-4 xl:mx-5"></div>
                                <div>
                                    <div class="text-slate-500 text-lg xl:text-xl font-medium">{{formatPrice(lastPriceTotal)}}</div>
                                    <div class="mt-0.5 text-slate-500">Last Month</div>
                                </div>
                            </div>
                            <Dropdown class="md:ml-auto mt-5 md:mt-0" :show="showDropdown" @click="onToggleDropdown">
                                <DropdownToggle class="btn btn-outline-secondary font-normal">
                                    {{categoryChoose}}
                                    <ChevronDownIcon class="w-4 h-4 ml-2" />
                                </DropdownToggle>
                                <DropdownMenu class="w-40">
                                    <DropdownContent class="overflow-y-auto h-32">
                                        <DropdownItem @click="selectCategory(0)">Filter by Category</DropdownItem>
                                        <DropdownItem
                                            v-for="(item, index) in listCategory"
                                            :key="index"
                                            @click="selectCategory(item.title)"
                                            >{{item.title}}</DropdownItem
                                        >
                                    </DropdownContent>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                        <div class="report-chart mb-8">
                            <ReportLineChart :calculateMonthCategory="calculateMonthCategory" :height="275" class="mt-6 -mb-6" />
                        </div>
                    </div>
                </div>
                <!-- END: Sales Report -->
                <!-- BEGIN: Weekly Top Seller -->
                <div class="col-span-12 sm:col-span-6 lg:col-span-3 mt-8">
                    <div class="intro-y flex items-center h-10">
                        <h2 class="text-lg font-medium truncate mr-5">Highest category sales</h2>
                        <a href="" class="ml-auto text-primary truncate">Show More</a>
                    </div>
                    <div class="intro-y box p-5 mt-5" v-if="listPercentCategory.pricePercentage">
                        <div class="mt-3">
                            <ReportPieChart :height="213" :listPercentCategory="listPercentCategory" />
                        </div>
                        <div class="flex items-center mt-4">
                            <span class="font-medium ">Total Price: {{ formatPrice(totalPrice) }}</span>
                        </div>
                        <div class="w-52 sm:w-auto mx-auto mt-4" v-for="(item, index) in listPercentCategory.pricePercentage.top3" :key="index">
                            <div class="flex items-center" v-if="index == 0">
                                <div class="w-2 h-2 bg-pending rounded-full mr-3"></div>
                                <span class="truncate">{{item[0]}}</span>
                                <span class="font-medium ml-auto">{{item[1]}}%</span>
                            </div>
                            <div class="flex items-center mt-4" v-if="index == 1">
                                <div class="w-2 h-2 bg-warning rounded-full mr-3"></div>
                                <span class="truncate">{{item[0]}}</span>
                                <span class="font-medium ml-auto">{{item[1]}}%</span>
                            </div>
                            <div class="flex items-center mt-4" v-if="index == 2">
                                <div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
                                <span class="truncate">{{item[0]}}</span>
                                <span class="font-medium ml-auto">{{item[1]}}%</span>
                            </div>
                        </div>
                        <div class="flex items-center mt-4" v-if="listPercentCategory.pricePercentage.other">
                            <div class="w-2 h-2 bg-secondary rounded-full mr-3"></div>
                            <span class="truncate">Other</span>
                            <span class="font-medium ml-auto">{{listPercentCategory.pricePercentage.other}}%</span>
                        </div>
                        <div class="flex items-center mt-4" v-else>
                            <div class="w-2 h-2 bg-secondary rounded-full mr-3"></div>
                            <span class="truncate">Other</span>
                            <span class="font-medium ml-auto">0%</span>
                        </div>
                    </div>
                </div>
                <!-- END: Weekly Top Seller -->
                <!-- BEGIN: Sales Report -->
                <div class="col-span-12 sm:col-span-6 lg:col-span-3 mt-8">
                    <div class="intro-y flex items-center h-10">
                        <h2 class="text-lg font-medium truncate mr-5">Category top sellers</h2>
                        <a href="" class="ml-auto text-primary truncate">Show More</a>
                    </div>
                    <div class="intro-y box p-5 mt-5" v-if="listPercentCategory.soldPercentage">
                        <div class="mt-3">
                            <ReportDonutChart :height="213" :listPercentCategory="listPercentCategory" />
                        </div>
                        <div class="flex items-center mt-4">
                            <span class="font-medium ">Total Sold: {{ totalSold }}</span>
                        </div>
                        <div class="w-52 sm:w-auto mx-auto mt-4" v-for="(item, index) in listPercentCategory.soldPercentage.top3" :key="index">
                            <div class="flex items-center" v-if="index == 0">
                                <div class="w-2 h-2 bg-pending rounded-full mr-3"></div>
                                <span class="truncate">{{item[0]}}</span>
                                <span class="font-medium ml-auto">{{item[1]}}%</span>
                            </div>
                            <div class="flex items-center mt-4" v-if="index == 1">
                                <div class="w-2 h-2 bg-warning rounded-full mr-3"></div>
                                <span class="truncate">{{item[0]}}</span>
                                <span class="font-medium ml-auto">{{item[1]}}%</span>
                            </div>
                            <div class="flex items-center mt-4" v-if="index == 2">
                                <div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
                                <span class="truncate">{{item[0]}}</span>
                                <span class="font-medium ml-auto">{{item[1]}}%</span>
                            </div>
                        </div>
                        <div class="flex items-center mt-4" v-if="listPercentCategory.soldPercentage.other">
                            <div class="w-2 h-2 bg-secondary rounded-full mr-3"></div>
                            <span class="truncate">Other</span>
                            <span class="font-medium ml-auto">{{listPercentCategory.soldPercentage.other}}%</span>
                        </div>
                        <div class="flex items-center mt-4" v-else>
                            <div class="w-2 h-2 bg-secondary rounded-full mr-3"></div>
                            <span class="truncate">Other</span>
                            <span class="font-medium ml-auto">0%</span>
                        </div>
                    </div>
                </div>
                <!-- END: Sales Report -->
                <!-- BEGIN: Official Store -->
                <div class="col-span-12 xl:col-span-8 mt-6">
                    <div class="intro-y block sm:flex items-center h-10">
                        <h2 class="text-lg font-medium truncate mr-5">Official Store</h2>
                        <div class="sm:ml-auto mt-3 sm:mt-0 relative text-slate-500">
                            <MapPinIcon class="w-4 h-4 z-10 absolute my-auto inset-y-0 ml-3 left-0" />
                            <input type="text" class="form-control sm:w-56 box pl-10" placeholder="Filter by city" />
                        </div>
                    </div>
                    <div class="intro-y box p-5 mt-12 sm:mt-5">
                        <div>250 Official stores in 21 countries, click the marker to see location details.</div>
                        <ReportMap class="report-maps mt-5 bg-slate-200 rounded-md" />
                    </div>
                </div>
                <!-- END: Official Store -->
                <!-- BEGIN: Weekly Best Sellers -->
                <div class="col-span-12 xl:col-span-4 mt-6">
                    <div class="intro-y flex items-center h-10">
                        <h2 class="text-lg font-medium truncate mr-5">Top Buyers Of The Week</h2>
                    </div>
                    <div class="mt-5">
                        <div v-for="(item, index) in listTopUserBought" :key="index" class="intro-y">
                            <div class="box px-4 py-4 mb-3 flex items-center zoom-in">
                                <div class="w-10 h-10 flex-none image-fit rounded-md overflow-hidden">
                                    <img alt="Midone Tailwind HTML Admin Template" :src="item.orderBy.avatar" />
                                </div>
                                <div class="ml-4 mr-auto">
                                    <div class="font-medium">
                                        {{ item.orderBy.firstname + " " + item.orderBy.lastname }}
                                    </div>
                                    <div class="text-slate-500 text-xs mt-0.5">
                                        {{ item.orderBy.email }}
                                    </div>
                                </div>
                                <div class="py-1 px-2 rounded-full text-xs bg-success text-white cursor-pointer font-medium">
                                    {{item.totalBuyers}} Bought
                                </div>
                            </div>
                        </div>
                        <a
                            href=""
                            class="intro-y w-full block text-center rounded-md py-4 border border-dotted border-slate-400 dark:border-darkmode-300 text-slate-500"
                            >View More</a
                        >
                    </div>
                </div>
                <!-- END: Weekly Best Sellers -->
                <!-- BEGIN: General Report -->
                <div class="col-span-12 grid grid-cols-12 gap-6 mt-8">
                    <div class="col-span-12 sm:col-span-6 2xl:col-span-3 intro-y">
                        <div class="box p-5 zoom-in">
                            <div class="flex items-center">
                                <div class="w-2/4 flex-none">
                                    <div class="text-lg font-medium truncate">Target Sales</div>
                                    <div class="text-slate-500 mt-1">{{soldProduct}} Sales</div>
                                </div>
                                <div class="flex-none ml-auto relative">
                                    <ReportDonutChart1 :width="90" :height="90" />
                                    <div class="font-medium absolute w-full h-full flex items-center justify-center top-0 left-0">20%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-span-12 sm:col-span-6 2xl:col-span-3 intro-y">
                        <div class="box p-5 zoom-in">
                            <div class="flex">
                                <div class="text-lg font-medium truncate mr-3">Social Media</div>
                                <div
                                    class="py-1 px-2 flex items-center rounded-full text-xs bg-slate-100 dark:bg-darkmode-400 text-slate-500 cursor-pointer ml-auto truncate"
                                >
                                    320 Followers
                                </div>
                            </div>
                            <div class="mt-1">
                                <SimpleLineChart1 :height="58" class="-ml-1" />
                            </div>
                        </div>
                    </div>
                    <div class="col-span-12 sm:col-span-6 2xl:col-span-3 intro-y">
                        <div class="box p-5 zoom-in">
                            <div class="flex items-center">
                                <div class="w-2/4 flex-none">
                                    <div class="text-lg font-medium truncate">New Products</div>
                                    <div class="text-slate-500 mt-1">{{quantityProduct}} Products</div>
                                </div>
                                <div class="flex-none ml-auto relative">
                                    <ReportDonutChart1 :width="90" :height="90" />
                                    <div class="font-medium absolute w-full h-full flex items-center justify-center top-0 left-0">45%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-span-12 sm:col-span-6 2xl:col-span-3 intro-y">
                        <div class="box p-5 zoom-in">
                            <div class="flex">
                                <div class="text-lg font-medium truncate mr-3">Posted</div>
                                <div
                                    class="py-1 px-2 flex items-center rounded-full text-xs bg-slate-100 dark:bg-darkmode-400 text-slate-500 cursor-pointer ml-auto truncate"
                                >
                                    {{listBlog.length}} Campaign
                                </div>
                            </div>
                            <div class="mt-1">
                                <SimpleLineChart1 :height="58" class="-ml-1" />
                            </div>
                        </div>
                    </div>
                </div>
                <!-- END: General Report -->
            </div>
        </div>
        <div class="col-span-12 2xl:col-span-3">
            <div class="2xl:border-l -mb-10 pb-10">
                <div class="2xl:pl-6 grid grid-cols-12 gap-x-6 2xl:gap-x-0 gap-y-6">
                    <!-- BEGIN: Transactions -->
                    <div class="col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-12 mt-3 2xl:mt-8">
                        <div class="intro-x flex items-center h-10">
                            <h2 class="text-lg font-medium truncate mr-5">Transactions</h2>
                        </div>
                        <div class="mt-5" id="itemContainer">
                            <div v-for="(item, index) in displayedItems" :key="index" class="intro-x">
                                <div class="box px-5 py-3 mb-3 flex items-center zoom-in">
                                    <div class="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                                        <img alt="Midone Tailwind HTML Admin Template" :src="item?.orderBy?.avatar" />
                                    </div>
                                    <div class="ml-4 mr-auto">
                                        <div class="font-medium">
                                            {{ item.orderBy.firstname + " " +  item.orderBy.lastname}}
                                        </div>
                                        <div class="text-slate-500 text-xs mt-0.5">
                                            {{ formatDateTime(item.createdAt) }}
                                        </div>
                                    </div>
                                    <div class="text-success">
                                        {{ formatPrice(item.total) }}
                                    </div>
                                </div>
                            </div>
                            <a
                                href="javascript:;"
                                class="intro-x w-full block text-center rounded-md py-3 border border-dotted border-slate-400 dark:border-darkmode-300 text-slate-500"
                                @click="showMoreItems"
                                >View More</a
                            >
                        </div>
                    </div>
                    <!-- END: Transactions -->

                    <!-- BEGIN: Important Notes -->
                    <div class="col-span-12 md:col-span-6 xl:col-span-12 xl:col-start-1 xl:row-start-1 2xl:col-start-auto 2xl:row-start-auto mt-3">
                        <div class="intro-x flex items-center h-10">
                            <h2 class="text-lg font-medium truncate mr-auto">Important Notes</h2>
                            <button
                                data-carousel="important-notes"
                                data-target="prev"
                                class="tiny-slider-navigator btn px-2 border-slate-300 text-slate-600 dark:text-slate-300 mr-2"
                                @click="prevImportantNotes"
                            >
                                <ChevronLeftIcon class="w-4 h-4" />
                            </button>
                            <button
                                data-carousel="important-notes"
                                data-target="next"
                                class="tiny-slider-navigator btn px-2 border-slate-300 text-slate-600 dark:text-slate-300 mr-2"
                                @click="nextImportantNotes"
                            >
                                <ChevronRightIcon class="w-4 h-4" />
                            </button>
                        </div>
                        <div class="mt-5 intro-x">
                            <div class="box zoom-in">
                                <TinySlider ref-key="importantNotesRef">
                                    <div class="p-5">
                                        <div class="text-base font-medium truncate">Lorem Ipsum is simply dummy text</div>
                                        <div class="text-slate-400 mt-1">20 Hours ago</div>
                                        <div class="text-slate-500 text-justify mt-1">
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                                            industry's standard dummy text ever since the 1500s.
                                        </div>
                                        <div class="font-medium flex mt-5">
                                            <button type="button" class="btn btn-secondary py-1 px-2">View Notes</button>
                                            <button type="button" class="btn btn-outline-secondary py-1 px-2 ml-auto ml-auto">Dismiss</button>
                                        </div>
                                    </div>
                                    <div class="p-5">
                                        <div class="text-base font-medium truncate">Lorem Ipsum is simply dummy text</div>
                                        <div class="text-slate-400 mt-1">20 Hours ago</div>
                                        <div class="text-slate-500 text-justify mt-1">
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                                            industry's standard dummy text ever since the 1500s.
                                        </div>
                                        <div class="font-medium flex mt-5">
                                            <button type="button" class="btn btn-secondary py-1 px-2">View Notes</button>
                                            <button type="button" class="btn btn-outline-secondary py-1 px-2 ml-auto ml-auto">Dismiss</button>
                                        </div>
                                    </div>
                                    <div class="p-5">
                                        <div class="text-base font-medium truncate">Lorem Ipsum is simply dummy text</div>
                                        <div class="text-slate-400 mt-1">20 Hours ago</div>
                                        <div class="text-slate-500 text-justify mt-1">
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                                            industry's standard dummy text ever since the 1500s.
                                        </div>
                                        <div class="font-medium flex mt-5">
                                            <button type="button" class="btn btn-secondary py-1 px-2">View Notes</button>
                                            <button type="button" class="btn btn-outline-secondary py-1 px-2 ml-auto ml-auto">Dismiss</button>
                                        </div>
                                    </div>
                                </TinySlider>
                            </div>
                        </div>
                    </div>
                    <!-- END: Important Notes -->
                    <!-- BEGIN: Schedules -->
                    <div
                        class="col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-12 xl:col-start-1 xl:row-start-2 2xl:col-start-auto 2xl:row-start-auto mt-3"
                    >
                        <div class="intro-x flex items-center h-10">
                            <h2 class="text-lg font-medium truncate mr-5">Schedules</h2>
                            <a href="" class="ml-auto text-primary truncate flex items-center">
                                <PlusIcon class="w-4 h-4 mr-1" /> Add New Schedules
                            </a>
                        </div>
                        <div class="mt-5">
                            <div class="intro-x box">
                                <div class="p-5">
                                    <div class="flex">
                                        <ChevronLeftIcon class="w-5 h-5 text-slate-500" />
                                        <div class="font-medium text-base mx-auto">April</div>
                                        <ChevronRightIcon class="w-5 h-5 text-slate-500" />
                                    </div>
                                    <div class="grid grid-cols-7 gap-4 mt-5 text-center">
                                        <div class="font-medium">Su</div>
                                        <div class="font-medium">Mo</div>
                                        <div class="font-medium">Tu</div>
                                        <div class="font-medium">We</div>
                                        <div class="font-medium">Th</div>
                                        <div class="font-medium">Fr</div>
                                        <div class="font-medium">Sa</div>
                                        <div class="py-0.5 rounded relative text-slate-500">29</div>
                                        <div class="py-0.5 rounded relative text-slate-500">30</div>
                                        <div class="py-0.5 rounded relative text-slate-500">31</div>
                                        <div class="py-0.5 rounded relative">1</div>
                                        <div class="py-0.5 rounded relative">2</div>
                                        <div class="py-0.5 rounded relative">3</div>
                                        <div class="py-0.5 rounded relative">4</div>
                                        <div class="py-0.5 rounded relative">5</div>
                                        <div class="py-0.5 bg-success/20 dark:bg-success/30 rounded relative">6</div>
                                        <div class="py-0.5 rounded relative">7</div>
                                        <div class="py-0.5 bg-primary text-white rounded relative">8</div>
                                        <div class="py-0.5 rounded relative">9</div>
                                        <div class="py-0.5 rounded relative">10</div>
                                        <div class="py-0.5 rounded relative">11</div>
                                        <div class="py-0.5 rounded relative">12</div>
                                        <div class="py-0.5 rounded relative">13</div>
                                        <div class="py-0.5 rounded relative">14</div>
                                        <div class="py-0.5 rounded relative">15</div>
                                        <div class="py-0.5 rounded relative">16</div>
                                        <div class="py-0.5 rounded relative">17</div>
                                        <div class="py-0.5 rounded relative">18</div>
                                        <div class="py-0.5 rounded relative">19</div>
                                        <div class="py-0.5 rounded relative">20</div>
                                        <div class="py-0.5 rounded relative">21</div>
                                        <div class="py-0.5 rounded relative">22</div>
                                        <div class="py-0.5 bg-pending/20 dark:bg-pending/30 rounded relative">23</div>
                                        <div class="py-0.5 rounded relative">24</div>
                                        <div class="py-0.5 rounded relative">25</div>
                                        <div class="py-0.5 rounded relative">26</div>
                                        <div class="py-0.5 bg-primary/10 dark:bg-primary/50 rounded relative">27</div>
                                        <div class="py-0.5 rounded relative">28</div>
                                        <div class="py-0.5 rounded relative">29</div>
                                        <div class="py-0.5 rounded relative">30</div>
                                        <div class="py-0.5 rounded relative text-slate-500">1</div>
                                        <div class="py-0.5 rounded relative text-slate-500">2</div>
                                        <div class="py-0.5 rounded relative text-slate-500">3</div>
                                        <div class="py-0.5 rounded relative text-slate-500">4</div>
                                        <div class="py-0.5 rounded relative text-slate-500">5</div>
                                        <div class="py-0.5 rounded relative text-slate-500">6</div>
                                        <div class="py-0.5 rounded relative text-slate-500">7</div>
                                        <div class="py-0.5 rounded relative text-slate-500">8</div>
                                        <div class="py-0.5 rounded relative text-slate-500">9</div>
                                    </div>
                                </div>
                                <div class="border-t border-slate-200/60 p-5">
                                    <div class="flex items-center">
                                        <div class="w-2 h-2 bg-pending rounded-full mr-3"></div>
                                        <span class="truncate">UI/UX Workshop</span>
                                        <span class="font-medium xl:ml-auto">23th</span>
                                    </div>
                                    <div class="flex items-center mt-4">
                                        <div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
                                        <span class="truncate">VueJs Frontend Development</span>
                                        <span class="font-medium xl:ml-auto">10th</span>
                                    </div>
                                    <div class="flex items-center mt-4">
                                        <div class="w-2 h-2 bg-warning rounded-full mr-3"></div>
                                        <span class="truncate">Laravel Rest API</span>
                                        <span class="font-medium xl:ml-auto">31th</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- END: Schedules -->
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, provide } from "vue";
import ReportLineChart from "@/components/report-line-chart/Main.vue";
import ReportDonutChart from "@/components/report-donut-chart/Main.vue";
import ReportPieChart from "@/components/report-pie-chart/Main.vue";
import ReportMap from "@/components/report-map/Main.vue";
import ReportDonutChart1 from "@/components/report-donut-chart-1/Main.vue";
import SimpleLineChart1 from "@/components/simple-line-chart-1/Main.vue";

const salesReportFilter = ref();
const importantNotesRef = ref();

provide("bind[importantNotesRef]", (el) => {
  importantNotesRef.value = el;
});

const prevImportantNotes = () => {
  const el = importantNotesRef.value;
  el.tns.goTo("prev");
};

const nextImportantNotes = () => {
  const el = importantNotesRef.value;
  el.tns.goTo("next");
};
</script>
<script>
import ProductApi from '../../api-services/ProductApi'
import OrderApi from '../../api-services/OrderApi'
import UserApi from '../../api-services/UserApi'
import CategoryProductApi from '../../api-services/CategoryProductApi'
import BlogApi from '../../api-services/BlogApi';
export default {
    data() {
        return {
            loadingIconAction: false,
            listProduct: [],
            listOrder: [],
            listUser: [],
            quantityProduct: 0,
            soldProduct: 0,
            totalOrder: 0,
            totalUser: 0,
            totalBuyers: 0,
            percentProduct: "",
            percentUser: "",
            percentOrder: "",
            percentItemSales: "",
            months : [
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ],
            categoryStatistic: [],
            calculateMonthCategory: [],
            categoryTotal: [],
            currentSoldTotal: 0,
            currentPriceTotal: 0,
            lastSoldTotal: 0,
            lastPriceTotal: 0,
            listCategory: [],
            showDropdown: false,
            categoryChoose: "Filter by Category",
            listPercentCategory: {},
            totalPrice: 0,
            totalSold: 0,
            listTopUserBought:[],
            displayedItems: [],
            showAll: false,
            listBlog: []
        }
    },
    created() {
        this.getListProduct()
        this.getListOrders()
        this.getListUser()
        this.getCategoryStatistic()
        this.getAllCategoryProduct()
        this.getAllBlog()
    },
    methods: {
        async getListProduct() {
            this.loadingIconAction = true
            const res = await ProductApi.getAllProduct()
            this.listProduct = res.mess
            this.listProduct.map((item, index) => {
                this.quantityProduct += item.quantity;
                this.soldProduct +=item.sold
            })
            this.loadingIconAction = false
        },
        async getAllCategoryProduct() {
            this.loadingIconAction = true
            const res = await CategoryProductApi.getAllCategoryProduct()
            this.listCategory = res.category
            this.loadingIconAction = false
        },
        async getAllBlog () {
            this.loadingIconAction = true
            const res = await BlogApi.getAllBlog()
            this.listBlog = res.blogs
            this.loadingIconAction = false
        },
        async getListOrders () {
            this.loadingIconAction = true
            const res = await OrderApi.getListOrders();
            this.listOrder = res.order
            this.totalOrder = this.listOrder.length;
            this.listOrder.map((item,index) => {
                this.totalBuyers = 0
                item.products.map((item2,index2) => {
                    this.totalBuyers += Number(item2.quatity);
                })
                item.totalBuyers = this.totalBuyers
            })
            this.listOrder.sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt);
            });
            this.displayedItems = this.listOrder.slice(0, 5);
            this.listTopUserBought = this.listOrder.reduce((acc, order) => {
                const foundOrderIndex = acc.findIndex(item => item.orderBy._id === order.orderBy._id);

                if (foundOrderIndex !== -1) {
                    acc[foundOrderIndex].totalBuyers += order.totalBuyers;
                    // Có thể thực hiện thêm các thao tác khác tại đây nếu cần
                } else {
                    acc.push({
                        _id: order._id,
                        orderBy: order.orderBy,
                        totalBuyers: order.totalBuyers,
                        // Thêm các thông tin khác từ order nếu cần
                    });
                }

                return acc;
            }, []);
            console.log(this.listTopUserBought);
            this.loadingIconAction = false
        },
        async getListUser() {
            this.loadingIconAction = true
            const res = await UserApi.getAllUsers()
            this.listUser = res.users
            this.totalUser = this.listUser.length
            this.loadingIconAction = false
        },
        checkCreateProduct() {
            const currentDate = new Date();
            const currentMonth = currentDate.getMonth() + 1;
            const lastMonth = currentDate.getMonth();

            const productThisMonth = this.listProduct.filter(product => {
                const productCreatedAt = new Date(product.createdAt);
                const productCreatedMonth = productCreatedAt.getMonth() + 1;

                return productCreatedMonth === currentMonth;
            });
            const productLastMonth = this.listProduct.filter(product => {
                const productCreatedAt = new Date(product.createdAt);
                const productCreatedMonth = productCreatedAt.getMonth() + 1;

                return productCreatedMonth === lastMonth;
            });
            const productThisMonthCount = productThisMonth.length;
            const productLastMonthCount = productLastMonth.length;
            let percentChange = 0
            if (productLastMonthCount != 0) {
                percentChange = ((productThisMonthCount - productLastMonthCount) / productLastMonthCount) * 100;
            } else if (productLastMonthCount == productThisMonthCount) {
                percentChange = 0
            }
            else {
                percentChange = 100
            }
            if (percentChange == 0) {
                this.percentProduct = "No change compared to last month";
            } else {

                this.percentProduct = `${Math.abs(percentChange)}% ${percentChange > 0 ? 'Higher' : 'Lower'} than last month`;
            }
            return percentChange;
        },
        getPercentCategory () {
            const totalSold = Object.values(this.categoryTotal).reduce((acc, item) => acc + item.soldTotal, 0);
            const totalPrice = Object.values(this.categoryTotal).reduce((acc, item) => acc + item.priceTotal, 0);
            this.totalSold = totalSold
            this.totalPrice = totalPrice
            let soldPercentage = {};
            let pricePercentage = {};

            for (const key in this.categoryTotal) {
                soldPercentage[key] = Math.round((this.categoryTotal[key].soldTotal / totalSold) * 100);
                pricePercentage[key] = Math.round((this.categoryTotal[key].priceTotal / totalPrice) * 100);
            }
            soldPercentage = this.topThreePercentCategory(soldPercentage)
            this.listPercentCategory.soldPercentage = soldPercentage
            pricePercentage = this.topThreePercentCategory(pricePercentage)
            this.listPercentCategory.pricePercentage = pricePercentage
        },
        topThreePercentCategory (percentages) {
            const sortedPercentages = Object.entries(percentages).sort(([, a], [, b]) => b - a);
            const top3 = sortedPercentages.slice(0, 3);

            const otherPercentage = sortedPercentages.slice(3).reduce((acc, [, percentage]) => acc + percentage, 0);
            return {
                top3: top3,
                other: otherPercentage
            }
        },
        checkCreateUser () {
            const currentDate = new Date();
            const currentMonth = currentDate.getMonth() + 1;
            const lastMonth = currentDate.getMonth();

            const usersThisMonth = this.listUser.filter(user => {
                const userCreatedAt = new Date(user.createdAt);
                const userCreatedMonth = userCreatedAt.getMonth() + 1;

                return userCreatedMonth === currentMonth;
            });
            const usersLastMonth = this.listUser.filter(user => {
                const userCreatedAt = new Date(user.createdAt);
                const userCreatedMonth = userCreatedAt.getMonth() + 1;

                return userCreatedMonth === lastMonth;
            });
            const usersThisMonthCount = usersThisMonth.length;
            const usersLastMonthCount = usersLastMonth.length;
            let percentChange = 0
            if (usersLastMonthCount != 0) {
                percentChange = ((usersThisMonthCount - usersLastMonthCount) / usersThisMonthCount) * 100;
            } else if (usersThisMonthCount == usersLastMonthCount) {
                percentChange = 0
            } else {
                percentChange = 100
            }
            if (percentChange == 0) {
                this.percentUser = "No change compared to last month";
            } else {

                this.percentUser = `${Math.abs(percentChange)}% ${percentChange > 0 ? 'Higher' : 'Lower'} than last month`;
            }
            return percentChange;
        },
        checkCreateOrder () {
            const currentDate = new Date();
            const currentMonth = currentDate.getMonth() + 1;
            const lastMonth = currentDate.getMonth();

            const orderThisMonth = this.listOrder.filter(order => {
                const orderCreatedAt = new Date(order.createdAt);
                const orderCreatedMonth = orderCreatedAt.getMonth() + 1;

                return orderCreatedMonth === currentMonth;
            });
            const orderLastMonth = this.listOrder.filter(order => {
                const orderCreatedAt = new Date(order.createdAt);
                const orderCreatedMonth = orderCreatedAt.getMonth() + 1;

                return orderCreatedMonth === lastMonth;
            });
            const orderThisMonthCount = orderThisMonth.length;
            const orderLastMonthCount = orderLastMonth.length;
            let percentChange = 0
            if (orderLastMonthCount != 0) {
                percentChange = ((orderThisMonthCount - orderLastMonthCount) / orderLastMonthCount) * 100;
            } else if (orderThisMonthCount == orderLastMonthCount) {
                percentChange = 0
            } else {
                percentChange = 100
            }
            if (percentChange == 0) {
                this.percentOrder = "No change compared to last month";
            } else {

                this.percentOrder = `${Math.abs(percentChange)}% ${percentChange > 0 ? 'Higher' : 'Lower'} than last month`;
            }
            return percentChange;
        },
        async getCategoryStatistic () {
            const res = await CategoryProductApi.getCategoryStatistic();
            this.categoryStatistic = this.calculateMonthlyTotals(res);
            console.log(this.categoryStatistic);
            this.categoryTotal = this.calculateCategoryTotal(this.categoryStatistic);
            this.calculateMonthCategory = this.calculateMonthCategoryTotal(this.categoryStatistic)
            this.totalCurrentAndLastMonth(this.calculateMonthCategory)
            this.getPercentCategory()
        },
        calculateMonthlyTotals (data)  {
            const newData = { ...data };

            newData.report.forEach(item => {
                for (const key in item) {
                    const salesData = item[key][0];

                    const monthlyTotals = this.months.reduce((acc, month) => {
                        acc[month] = {
                            soldTotal: 0,
                            priceTotal: 0
                        };

                        if (salesData) {
                            salesData.forEach(sale => {
                                const saleDate = new Date(sale.date);
                                const saleMonth = this.months[saleDate.getMonth()];

                                if (saleMonth === month) {
                                    acc[month].soldTotal += sale.sold || 0;
                                    acc[month].priceTotal += sale.price || 0;
                                }
                            });
                        }

                        return acc;
                    }, {});

                    item[key][0] = [monthlyTotals];
                }
        });
            return newData;
        },
        calculateCategoryTotal(data) {
            const categoryTotals = {};

            data.report.forEach(item => {
                for (const key in item) {
                    const monthlyData = item[key][0][0];

                    if (!categoryTotals[key]) {
                        categoryTotals[key] = {
                            soldTotal: 0,
                            priceTotal: 0
                        };
                    }

                    for (const month in monthlyData) {
                        categoryTotals[key].soldTotal += monthlyData[month].soldTotal;
                        categoryTotals[key].priceTotal += monthlyData[month].priceTotal;
                    }
                }
            });

            return categoryTotals;
        },
        calculateMonthCategoryTotal(data) {
            const monthCategoryTotals = this.months.reduce((acc, month) => {
                acc[month] = {
                    soldTotal: 0,
                    priceTotal: 0
                };

                data.report.forEach(item => {
                    for (const key in item) {
                        const monthlyData = item[key][0][0];

                        if (monthlyData[month]) {
                            acc[month].soldTotal += monthlyData[month].soldTotal;
                            acc[month].priceTotal += monthlyData[month].priceTotal;
                        }
                    }
                });

                return acc;
            }, {});

            return monthCategoryTotals;
        },
        totalCurrentAndLastMonth(data) {
            const months = Object.keys(data);

            const currentDate = new Date();
            const currentMonthIndex = currentDate.getMonth();
            const lastMonthIndex = currentMonthIndex === 0 ? 11 : currentMonthIndex - 1;
            const currentMonth = months[currentMonthIndex];
            const lastMonth = months[lastMonthIndex];
            this.currentSoldTotal = data[currentMonth].soldTotal;
            this.currentPriceTotal = data[currentMonth].priceTotal;
            this.lastSoldTotal = data[lastMonth].soldTotal;
            this.lastPriceTotal = data[lastMonth].priceTotal;
        },
        totalCurrentAndLastMonthInCategory (monthlyData) {
            const currentDate = new Date();
            const currentMonth = currentDate.getMonth() + 1;
            const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;

            const currentMonthName = Object.keys(monthlyData)[currentMonth - 1];
            const lastMonthName = Object.keys(monthlyData)[lastMonth - 1];
            this.lastSoldTotal = monthlyData[lastMonthName].soldTotal;
            this.currentSoldTotal = monthlyData[currentMonthName].soldTotal;
            this.lastPriceTotal = monthlyData[lastMonthName].priceTotal;
            this.currentPriceTotal = monthlyData[currentMonthName].priceTotal;
        },
        checkItemSalse() {
            let quantityThisMonth = 0;
            let quantityLastMonth = 0;
            const currentDate = new Date();
            const currentMonth = currentDate.getMonth() + 1;
            const lastMonth = currentDate.getMonth();
            // Lặp qua mỗi đơn hàng
            this.listOrder.forEach(order => {
                const createdAt = new Date(order.createdAt);
                const orderMonth = createdAt.getMonth();

                // Lặp qua từng sản phẩm trong đơn hàng
                order.products.forEach(product => {
                    const productQuantity = parseInt(product.quatity);
                    if (orderMonth === currentMonth) {
                        quantityThisMonth += productQuantity;
                    } else if (orderMonth === lastMonth) {
                        quantityLastMonth += productQuantity;
                    }
                });
            });
            let percentChange = 0
            if (quantityLastMonth != 0) {
                percentChange = ((quantityThisMonth - quantityLastMonth) / quantityLastMonth) * 100;
            }else if (quantityLastMonth == quantityThisMonth) {
                percentChange = 0
            } else {
                percentChange = 100
            }
            if (percentChange == 0) {
                this.percentItemSales = "No change compared to last month";
            } else {

                this.percentItemSales = `${Math.abs(percentChange)}% ${percentChange > 0 ? 'Higher' : 'Lower'} than last month`;
            }
            return percentChange
        },
        formatDateTime(date) {
            const originalDateTime = new Date(date);
            const options = { day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric' };
            return originalDateTime.toLocaleDateString('en-US', options);

        },
        formatPrice(price) {
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
        },
        onToggleDropdown () {
            this.showDropdown = true
        },
        async selectCategory(value) {
            this.showDropdown = false
            if (value === 0) {
                this.categoryChoose = "Filter by Category"
                await this.getCategoryStatistic()
            } else {
                this.categoryChoose = value
            }
            this.categoryStatistic.report.map((item, index) => {
                if (item[value] !== undefined) {
                    console.log(item[value][0][0]);
                    this.totalCurrentAndLastMonthInCategory(item[value][0][0])
                    this.calculateMonthCategory = item[value][0][0];
                }
            })
        },
        showMoreItems() {
            if (!this.showAll) {
                this.displayedItems = this.listOrder.slice(0, 5);
            } else {
                this.displayedItems = this.listOrder;
            }
            this.showAll = !this.showAll;
        }
    },
    computed() {

    }
}
</script>
