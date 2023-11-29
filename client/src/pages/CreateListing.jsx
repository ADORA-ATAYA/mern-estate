
const CreateListing = () => {
  return (
    <main className="p-3 max-w-4xl mx-auto">
        <h3 className="text-3xl font-semibold text-center my-4">Create a Listing</h3>
        <form className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col flex-1 gap-4">
                <input  className='p-2 rounded-lg'type="text" id="name" placeholder="Name" required min={6} max={15}/>
                <textarea className='p-2 rounded-lg' id="description" placeholder="Description" required />
                <input className='p-2 rounded-lg' type="text" id="address" placeholder="Address" required />
                <div className="flex gap-6 flex-wrap">
                    <div className="flex gap-2">
                        <input className="w-5" type="checkbox" id="sell"/>
                        <span>Sell</span>
                    </div>
                    <div className="flex gap-2">
                        <input className="w-5" type="checkbox" id="rent"/>
                        <span>Rent</span>
                    </div>
                    <div className="flex gap-2">
                        <input className="w-5" type="checkbox" id="parking"/>
                        <span>Parking Spot</span>
                    </div>
                    <div className="flex gap-2">
                        <input className="w-5" type="checkbox" id="furnished"/>
                        <span>Furnished</span>
                    </div>
                    <div className="flex gap-2">
                        <input className="w-5" type="checkbox" id="offer"/>
                        <span>Offer</span>
                    </div>
                </div>
                <div className="flex gap-6 flex-wrap">
                    <div className="flex gap-2 items-center">
                        <input className="p-3 border border-gray-700" min={1} max={10} type="number"  id="beds" required/>
                        <span>Beds</span>
                    </div>
                    <div className="flex gap-2 items-center">
                        <input className="p-3 border border-gray-700" min={1} max={10} type="number"  id="baths" required/>
                        <span>Baths</span>
                    </div>
                    <div className="flex gap-2 items-center">
                        <input className="p-3 border border-gray-700" type="number"  id="regularprice" required/>
                        <div className="flex flex-col items-center">
                            <p>Regular Price</p>
                            <span className="text-xs">($ / month)</span>
                        </div>
            
                    </div>
                    <div className="flex gap-2 items-center">
                        <input className="p-3 border border-gray-700" type="number"  id="discountedprice" required/>
                        <div className="flex flex-col items-center">
                            <p>Discounted Price</p>
                            <span className="text-xs">($ / month)</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col flex-1 gap-4">
                <p className="font-semibold">Images:
                    <span className="font-normal text-gray-700 ml-2">The first image will be the cover (max 6)</span>
                </p>
                <div className="flex gap-4">
                <input className='p-3 border border-gray-300 rounded w-full' type="file"  id="image"  accept="image/*" multiple/>
                <button className="p-2 text-green-500 border border-green-500 rounded-sm uppercase
                hover:shadow-lg hover:bg-green-500 hover:text-white disabled:opacity-80">upload</button>
                </div>
                <button className="p-3 bg-slate-700 text-white rounded uppercase hover:opacity-80 disabled:opacity-70">Create listing</button>
            </div>
        </form>
    </main>
  )
}

export default CreateListing