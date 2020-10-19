import Bluebird from 'bluebird'
import path from 'path'
import _fs from 'fs'
import rethinkdbdash from 'rethinkdbdash'
import RethinkQuery from './utils/RethinkQuery'

/*
 Make global variables here
*/
global.Bluebird = Bluebird
global.r = rethinkdbdash({ silent: true })
global.Query = new RethinkQuery()
global.path = path
global.fs = _fs.promises
global.log = (...args: (any | string)[]) => console.log(...args)

