#!/bin/bash

export NODE_ENV=production

# lpwind
(node bin/sync --provider=lpwind --seller=used --path=sails)
(node bin/sync --provider=lpwind --seller=new --path=sails --no-checkHosts)

(node bin/sync --provider=lpwind --seller=used --path=boards --no-checkHosts)
(node bin/sync --provider=lpwind --seller=new --path=boards --no-checkHosts)

(node bin/sync --provider=lpwind --seller=used --path=masts --no-checkHosts)
(node bin/sync --provider=lpwind --seller=new --path=masts --no-checkHosts)

(node bin/sync --provider=lpwind --seller=used --path=booms --no-checkHosts)
(node bin/sync --provider=lpwind --seller=new --path=booms --no-checkHosts)

(node bin/sync --provider=lpwind --seller=new --path=fins --no-checkHosts)
