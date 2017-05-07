#!/bin/bash

export NODE_ENV=production

# telstarsurf
(node bin/provider/sync --provider=telstarsurf --seller=used --path=sails)
(node bin/provider/sync --provider=telstarsurf --seller=wave --path=sails --no-checkHosts)
(node bin/provider/sync --provider=telstarsurf --seller=freestyle --path=sails --no-checkHosts)
(node bin/provider/sync --provider=telstarsurf --seller=freeride --path=sails --no-checkHosts)
(node bin/provider/sync --provider=telstarsurf --seller=freerace --path=sails --no-checkHosts)
(node bin/provider/sync --provider=telstarsurf --seller=slalom --path=sails --no-checkHosts)

(node bin/provider/sync --provider=telstarsurf --seller=used --path=boards --no-checkHosts)
(node bin/provider/sync --provider=telstarsurf --seller=wave --path=boards --no-checkHosts)
(node bin/provider/sync --provider=telstarsurf --seller=freestyle --path=boards --no-checkHosts)
(node bin/provider/sync --provider=telstarsurf --seller=freeride --path=boards --no-checkHosts)
(node bin/provider/sync --provider=telstarsurf --seller=freerace --path=boards --no-checkHosts)
(node bin/provider/sync --provider=telstarsurf --seller=slalom --path=boards --no-checkHosts)

(node bin/provider/sync --provider=telstarsurf --seller=rdm --path=masts --no-checkHosts)
(node bin/provider/sync --provider=telstarsurf --seller=sdm --path=masts --no-checkHosts)

(node bin/provider/sync --provider=telstarsurf --seller=aluminum --path=booms --no-checkHosts)
(node bin/provider/sync --provider=telstarsurf --seller=carbon --path=booms --no-checkHosts)

(node bin/provider/sync --provider=telstarsurf --seller=wave --path=fins --no-checkHosts)
(node bin/provider/sync --provider=telstarsurf --seller=freeride --path=fins --no-checkHosts)
(node bin/provider/sync --provider=telstarsurf --seller=slalom --path=fins --no-checkHosts)
