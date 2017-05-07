#!/bin/bash

export NODE_ENV=production

# bellini
(node bin/provider/reindex --provider=bellini --path=sails --seller=all)
(node bin/provider/reindex --provider=bellini --path=boards --seller=all --no-checkHosts)
(node bin/provider/reindex --provider=bellini --path=masts --seller=all --no-checkHosts)
(node bin/provider/reindex --provider=bellini --path=fins --seller=all --no-checkHosts)
(node bin/provider/reindex --provider=bellini --path=booms --seller=all --no-checkHosts)
