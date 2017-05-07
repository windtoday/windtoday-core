#!/bin/bash

export NODE_ENV=production

# totalwind
(node bin/provider/reindex --provider=totalwind --seller=particular --path=sails)
(node bin/provider/reindex --provider=totalwind --seller=particular --path=boards --no-checkHosts)
(node bin/provider/reindex --provider=totalwind --seller=particular --path=masts --no-checkHosts)
(node bin/provider/reindex --provider=totalwind --seller=particular --path=fins --no-checkHosts)
(node bin/provider/reindex --provider=totalwind --seller=particular --path=booms --no-checkHosts)
(node bin/provider/reindex --provider=totalwind --seller=particular --path=accesories --no-checkHosts)
(node bin/provider/reindex --provider=totalwind --seller=particular --path=packs --no-checkHosts)
