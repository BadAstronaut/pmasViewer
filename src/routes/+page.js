import { error } from '@sveltejs/kit';
import {get} from 'svelte/store';
import {speckleStream, daluxSafetyDataActiveProject, } from "../stores/toolStore";
/** @type {import('./$types').PageLoad} */
//vivienda interface 
const viviendaInterface = {
  title: "",
  content: "",
  speckleStream: "",
  daluxSafetyData: "",
}
const _speckleStream ='aa043c36dd';



export async function load({fetch, params }) {
    speckleStream.set(_speckleStream)
    return {_speckleStream};
  throw error(404, 'Not found /:');
}