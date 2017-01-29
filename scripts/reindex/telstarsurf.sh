#!/bin/bash

export NODE_ENV=production

# telstarsurf

(node bin/reindex --provider=telstarsurf --seller=used --path=sails)
(node bin/reindex --provider=telstarsurf --seller=wave --path=sails)
(node bin/reindex --provider=telstarsurf --seller=freestyle --path=sails)
(node bin/reindex --provider=telstarsurf --seller=freeride --path=sails)
(node bin/reindex --provider=telstarsurf --seller=freerace --path=sails)
(node bin/reindex --provider=telstarsurf --seller=slalom --path=sails)

(node bin/reindex --provider=telstarsurf --seller=used --path=boards)
(node bin/reindex --provider=telstarsurf --seller=wave --path=boards)
(node bin/reindex --provider=telstarsurf --seller=freestyle --path=boards)
(node bin/reindex --provider=telstarsurf --seller=freeride --path=boards)
(node bin/reindex --provider=telstarsurf --seller=freerace --path=boards)
(node bin/reindex --provider=telstarsurf --seller=slalom --path=boards)

(node bin/reindex --provider=telstarsurf --seller=rdm --path=masts)
(node bin/reindex --provider=telstarsurf --seller=sdm --path=masts)

(node bin/reindex --provider=telstarsurf --seller=aluminum --path=booms)
(node bin/reindex --provider=telstarsurf --seller=carbon --path=booms)

(node bin/reindex --provider=telstarsurf --seller=wave --path=fins)
(node bin/reindex --provider=telstarsurf --seller=freeride --path=fins)
(node bin/reindex --provider=telstarsurf --seller=slalom --path=fins)
