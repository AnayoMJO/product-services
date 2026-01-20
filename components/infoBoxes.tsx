import InfoBox from "./infoBox"

const InfoBoxes = () => {
  return (
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <InfoBox
            heading={"for Buyers"}
            backgroundColor={"bg-gray-200"}
            textColor={"text-gray-800"}
            buttonInfo={{text:"Browse Properties", link:"/properties", bgColor:"bg-gray-800"}}
            >
            Find your dream rental property. Bookmark properties and contact
              owners
          </InfoBox>
          <InfoBox
            heading={"For Property Owners"}
            backgroundColor={"bg-blue-200"}
            textColor={"text-gray-800"}
            buttonInfo={{text:"Add Property", link:"/properties/addProperty", bgColor:"bg-gray-800"}}
            >
            List your properties and reach potential clients. Buy as an
            airbnb or long term
          </InfoBox>
        </div>
      </div>
    </section>

  )
}

export default InfoBoxes
