class RegionInfoService {

    constructor(regions){
        this.regions = regions;
    }

    getVisited() {
        return Object.keys(this.regions.visited);
    }

    getCrossed(){
        return this.regions.crossed;
    }

    isVisited(regionCode) {
        return this.getVisited().indexOf(regionCode) >= 0;
    }

    getAlbum(regionCode){
        if(this.isVisited(regionCode)){
            return this.regions.visited[regionCode];
        } else return "";
    }

}

export default RegionInfoService;