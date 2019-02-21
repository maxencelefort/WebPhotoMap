import usStates from "../resources/us_states_info";
import RegionInfoService from "./RegionInfoService";

class USStateInfoService extends RegionInfoService{

    constructor(){
        super(usStates);
    }

}

export default USStateInfoService;