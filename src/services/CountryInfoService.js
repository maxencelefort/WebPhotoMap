import countries from "../resources/countries_info.json";
import RegionInfoService from "./RegionInfoService";

class CountryInfoService extends RegionInfoService{

    constructor(){
        super(countries);
    }

}

export default CountryInfoService;