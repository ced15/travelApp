const TripForm = () => {
    return (
        <div class="absolute z-10 max-w-screen-sm pr-8">
            <div>
                <div class="bg-white rounded-lg shadow-lg p-4 px-4 md:p-8 mb-6 h-full">
                    <div class="text-gray-600 pb-4 text-center">
                        <p>Create your Trip</p>
                    </div>
                    <div class="lg:col-span-2">
                        <div class="grid gap-4 gap-y-4 text-sm grid-cols-1 md:grid-cols-6">
                            <div class="md:col-span-6">
                                <label for="full_name">Trip Name</label>
                                <input type="text" name="full_name" id="full_name" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" placeholder="Add your Trip name" />
                            </div>

                            <div class="md:col-span-6">
                                <label for="email">Locations</label>
                                <input type="text" name="email" id="email" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" placeholder="Add your locations" />
                            </div>

                            <div class="md:col-span-6">
                                <label for="address">Memento</label>
                                <textarea type="text" name="address" id="address" class="h-16 pt-2 border mt-1 rounded px-4 w-full bg-gray-50" value="" placeholder="Add your memento" />
                            </div>

                            <div class="md:col-span-3">
                                <label for="Arrival Date">Arrival Date</label>
                                <div class="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                                    <input name="country" id="country" placeholder="Arrival Date" class="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent" value="" />
                                    <button tabindex="-1" class="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600">
                                        <svg class="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <line x1="18" y1="6" x2="6" y2="18"></line>
                                            <line x1="6" y1="6" x2="18" y2="18"></line>
                                        </svg>
                                    </button>
                                    <button tabindex="-1" for="show_more" class="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600">
                                        <svg class="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
                                    </button>
                                </div>
                            </div>

                            <div class="md:col-span-3">
                                <label for="Departure Date">Departure Date</label>
                                <div class="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                                    <input name="state" id="state" placeholder="Departure Date" class="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent" value="" />
                                    <button tabindex="-1" class="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600">
                                        <svg class="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <line x1="18" y1="6" x2="6" y2="18"></line>
                                            <line x1="6" y1="6" x2="18" y2="18"></line>
                                        </svg>
                                    </button>
                                    <button tabindex="-1" for="show_more" class="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600">
                                        <svg class="w-4 h-4 mx-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
                                    </button>
                                </div>
                            </div>                          

                            <div class="md:col-span-6 text-right">
                                <div class="inline-flex items-end">
                                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default TripForm;