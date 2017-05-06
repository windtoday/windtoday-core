#!/bin/bash

export NODE_ENV=production

# totalwind
(node bin/provider/sync --provider=bellini --path=sails --seller=all)
(node bin/provider/sync --provider=bellini --path=boards --seller=all --no-checkHosts)
(node bin/provider/sync --provider=bellini --path=masts --seller=all --no-checkHosts)
(node bin/provider/sync --provider=bellini --path=fins --seller=all --no-checkHosts)
(node bin/provider/sync --provider=bellini --path=booms --seller=all --no-checkHosts)
