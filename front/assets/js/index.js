import {createWork} from "./factories.js";
import {getWorks} from "./repositories.js";

(await getWorks()).forEach(work => document.querySelector('.gallery').appendChild(createWork(work)));
