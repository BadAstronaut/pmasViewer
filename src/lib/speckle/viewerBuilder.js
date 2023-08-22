import { ViewerEvent } from "@speckle/viewer";
import { getStreamCommits, getUserData } from "./speckleUtils.js";
import { get } from "svelte/store";
import { speckleViewer, finishLoading, speckleStream, speckleDatatree, revitProps, protosProps, speckleParqueLotes, speckleParqueProtos, viewerLotes, viewerProtos, revitPassportParameterName, viewerPMasElements, viewerPMasRevinedElements } from "../../stores/toolStore";
import {
    getPropertiesByTypeParameter,
    filterByCategoryNames,
    filterByCustomPropertyName,
    checkCustomPropertyByName
} from "$lib/speckle/speckleHandler";



export async function buildViewerData() {
    const speckleDT = get(speckleDatatree)
    setSpeckleObjects(speckleDT)
    const pMasRefinedObjects = getViewerObjects()
    console.log("redeffinedd",get(viewerPMasElements))

}
//this function builds the speckle base objects in the scene (lotes and protos)
function setSpeckleObjects(speckleDT) {
    const propsToQuery = get(revitProps)
    const passportProp = get(revitPassportParameterName)
    const passportElements = filterByCustomPropertyName(speckleDT, passportProp)
    viewerPMasElements.set(passportElements)
}

function getViewerObjects() {
    const _revitProps = get(revitProps)
    const pmasObjects = get(viewerPMasElements)
    //to do modify this to ad props to render in front end. 
    const pMasViewerObjects = extractParamData(pmasObjects, _revitProps, "PMas")
    viewerPMasElements.set(pMasViewerObjects)
    //console.log("loteViewerObjects",loteViewerObjects)
}

function extractParamData(speckleObjects, params, type) {
    const paramData = []

    speckleObjects.forEach(obj => {
        //clone viewerObj
        const props = obj.parameters
        const _viewerObj = {}
        _viewerObj.id = obj.id
        _viewerObj.category = obj.category
        _viewerObj.tipo = type
        _viewerObj.family = obj.family
        _viewerObj.name = obj.type
        //console.log("====obj",obj.parameters["Area"])
        const checkCustomPMas = checkCustomPropertyByName(props, get(revitPassportParameterName))
        _viewerObj.IDPasaporte = checkCustomPMas ? checkCustomPMas : "No ID"
        //console.log("checkCustomPMas", checkCustomPMas)
        paramData.push(_viewerObj)
    })
    //console.log("paramData", paramData)
    return paramData
}