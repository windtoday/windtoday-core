#!/bin/bash

export NODE_ENV=production

# telstarsurf
(node bin/reindex --provider=telstarsurf --seller=used --path=sails)
(node bin/reindex --provider=telstarsurf --seller=wave --path=sails --no-checkHosts)
(node bin/reindex --provider=telstarsurf --seller=freestyle --path=sails --no-checkHosts)
(node bin/reindex --provider=telstarsurf --seller=freeride --path=sails --no-checkHosts)
(node bin/reindex --provider=telstarsurf --seller=freerace --path=sails --no-checkHosts)
(node bin/reindex --provider=telstarsurf --seller=slalom --path=sails --no-checkHosts)

(node bin/reindex --provider=telstarsurf --seller=used --path=boards --no-checkHosts)
(node bin/reindex --provider=telstarsurf --seller=wave --path=boards --no-checkHosts)
(node bin/reindex --provider=telstarsurf --seller=freestyle --path=boards --no-checkHosts)
(node bin/reindex --provider=telstarsurf --seller=freeride --path=boards --no-checkHosts)
(node bin/reindex --provider=telstarsurf --seller=freerace --path=boards --no-checkHosts)
(node bin/reindex --provider=telstarsurf --seller=slalom --path=boards --no-checkHosts)

(node bin/reindex --provider=telstarsurf --seller=rdm --path=masts --no-checkHosts)
(node bin/reindex --provider=telstarsurf --seller=sdm --path=masts --no-checkHosts)

(node bin/reindex --provider=telstarsurf --seller=aluminum --path=booms --no-checkHosts)
(node bin/reindex --provider=telstarsurf --seller=carbon --path=booms --no-checkHosts)

(node bin/reindex --provider=telstarsurf --seller=wave --path=fins --no-checkHosts)
(node bin/reindex --provider=telstarsurf --seller=freeride --path=fins --no-checkHosts)
(node bin/reindex --provider=telstarsurf --seller=slalom --path=fins --no-checkHosts)
