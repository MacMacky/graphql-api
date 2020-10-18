import Bluebird from 'bluebird'
import rethinkdbdash from 'rethinkdbdash'
import RethinkQuery from './utils/RethinkQuery'

/*
 Make global variables here
*/
global.Bluebird = Bluebird
global.r = rethinkdbdash({ silent: true })
global.Query = new RethinkQuery()