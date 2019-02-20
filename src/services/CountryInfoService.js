import countries from "../resources/countries_info.json";

class CountryInfoService {

    static getVisitedCountries(){
        return Object.keys(countries.visited);
    }

    static getCrossedCountries(){
        return countries.crossed;
    }

    static isVisited(countryCode) {
        return this.getVisitedCountries().indexOf(countryCode) > 1;
    }

    static getAlbum(countryCode){
        if(this.isVisited(countryCode) > 1){
            return countries.visited[countryCode];
        } else return "";
    }
}

export default CountryInfoService;