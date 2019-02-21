class RegionInfoService {

    constructor(regions){
        this.regions = regions;
    }

    getVisited() {
        return this.addRegionPrefix(Object.keys(this.regions.visited));
    }

    getCrossed(){
        return this.addRegionPrefix(this.regions.crossed);
    }

    addRegionPrefix(regions){
        if(this.regions.prefix != undefined){
            const prefix = this.regions.prefix;
            let visitedRegions = regions.map(function(region) {
                return prefix+region;
            });
            return visitedRegions;
        }
        return regions;
    }

    isVisited(regionCode) {
        return this.getVisited().indexOf(regionCode) >= 0;
    }

    getRegionContent(regionCode){
        if(this.isVisited(regionCode)){
            console.log("access region content ",this.removePrefix(regionCode)," from ",this.regions.visited);
            return this.regions.visited[this.removePrefix(regionCode)];
        } else return "";
    }

    removePrefix(regionCode) {
        if(this.regions.prefix != undefined){
            return regionCode.replace(this.regions.prefix,'');
        }
        return regionCode;
    }

}

export default RegionInfoService;