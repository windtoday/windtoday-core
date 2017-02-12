#!/bin/bash

export NODE_ENV=production

# telstarsurf
(node bin/sync --provider=telstarsurf --seller=all --path=sails)
(node bin/sync --provider=telstarsurf --seller=all --path=boards --no-checkHosts)
(node bin/sync --provider=telstarsurf --seller=all --path=masts --no-checkHosts)
(node bin/sync --provider=telstarsurf --seller=all --path=booms --no-checkHosts)
(node bin/sync --provider=telstarsurf --seller=all --path=fins --no-checkHosts)
