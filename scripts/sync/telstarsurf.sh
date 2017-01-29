#!/bin/bash

export NODE_ENV=production

# telstarsurf
(node bin/sync --provider=telstarsurf --seller=used --path=sails)
(node bin/sync --provider=telstarsurf --seller=wave --path=sails)
(node bin/sync --provider=telstarsurf --seller=freestyle --path=sails)
(node bin/sync --provider=telstarsurf --seller=freeride --path=sails)
(node bin/sync --provider=telstarsurf --seller=freerace --path=sails)
(node bin/sync --provider=telstarsurf --seller=slalom --path=sails)

(node bin/sync --provider=telstarsurf --seller=used --path=boards)
(node bin/sync --provider=telstarsurf --seller=wave --path=boards)
(node bin/sync --provider=telstarsurf --seller=freestyle --path=boards)
(node bin/sync --provider=telstarsurf --seller=freeride --path=boards)
(node bin/sync --provider=telstarsurf --seller=freerace --path=boards)
(node bin/sync --provider=telstarsurf --seller=slalom --path=boards)

(node bin/sync --provider=telstarsurf --seller=rdm --path=masts)
(node bin/sync --provider=telstarsurf --seller=sdm --path=masts)

(node bin/sync --provider=telstarsurf --seller=aluminum --path=booms)
(node bin/sync --provider=telstarsurf --seller=carbon --path=booms)

(node bin/sync --provider=telstarsurf --seller=wave --path=fins)
(node bin/sync --provider=telstarsurf --seller=freeride --path=fins)
(node bin/sync --provider=telstarsurf --seller=slalom --path=fins)
