#!/bin/bash

export NODE_ENV=production

# surfkeppler
(node bin/reindex --provider=surfkeppler --seller=outlet --path=sails)
(node bin/reindex --provider=surfkeppler --seller=new --path=sails --no-checkHosts)
(node bin/reindex --provider=surfkeppler --seller=new --path=boards --no-checkHosts)
(node bin/reindex --provider=surfkeppler --seller=new --path=booms --no-checkHosts)
(node bin/reindex --provider=surfkeppler --seller=new --path=masts --no-checkHosts)
(node bin/reindex --provider=surfkeppler --seller=outlet --path=masts --no-checkHosts)
