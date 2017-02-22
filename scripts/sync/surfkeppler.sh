#!/bin/bash

export NODE_ENV=production

# surfkeppler
(node bin/sync --provider=surfkeppler --seller=outlet --path=sails)
(node bin/sync --provider=surfkeppler --seller=new --path=sails --no-checkHosts)
(node bin/sync --provider=surfkeppler --seller=new --path=boards --no-checkHosts)
(node bin/sync --provider=surfkeppler --seller=new --path=booms --no-checkHosts)
(node bin/sync --provider=surfkeppler --seller=new --path=masts --no-checkHosts)
(node bin/sync --provider=surfkeppler --seller=outlet --path=masts --no-checkHosts)
