SELECT category, COUNT(*) as occurrences, 'adiq_adiq_ws_api' as issuer
FROM adiq_adiq_ws_api
WHERE CAST(from_unixtime(startdatetime / 1000) AS date) BETWEEN date '2024-06-01' AND date '2024-06-30'
GROUP BY category

UNION ALL

SELECT category, COUNT(*) as occurrences, 'asaas_asaas_ws_api' as issuer
FROM asaas_asaas_ws_api
WHERE CAST(from_unixtime(startdatetime / 1000) AS date) BETWEEN date '2024-06-01' AND date '2024-06-30'
GROUP BY category

UNION ALL

SELECT category, COUNT(*) as occurrences, 'b4_b4_ws_api' as issuer
FROM b4_b4_ws_api
WHERE CAST(from_unixtime(startdatetime / 1000) AS date) BETWEEN date '2024-06-01' AND date '2024-06-30'
GROUP BY category

UNION ALL

SELECT category, COUNT(*) as occurrences, 'beevale_beevale_ws_api' as issuer
FROM beevale_beevale_ws_api
WHERE CAST(from_unixtime(startdatetime / 1000) AS date) BETWEEN date '2024-06-01' AND date '2024-06-30'
GROUP BY category

UNION ALL

SELECT category, COUNT(*) as occurrences, 'brasilcash_brasilcash_ws_api' as issuer
FROM brasilcash_brasilcash_ws_api
WHERE CAST(from_unixtime(startdatetime / 1000) AS date) BETWEEN date '2024-06-01' AND date '2024-06-30'
GROUP BY category

UNION ALL

SELECT category, COUNT(*) as occurrences, 'cashin_cashin_ws_api' as issuer
FROM cashin_cashin_ws_api
WHERE CAST(from_unixtime(startdatetime / 1000) AS date) BETWEEN date '2024-06-01' AND date '2024-06-30'
GROUP BY category

UNION ALL

SELECT category, COUNT(*) as occurrences, 'comprocard_comprocard_ws_api' as issuer
FROM comprocard_comprocard_ws_api
WHERE CAST(from_unixtime(startdatetime / 1000) AS date) BETWEEN date '2024-06-01' AND date '2024-06-30'
GROUP BY category

UNION ALL

SELECT category, COUNT(*) as occurrences, 'contapronta_contapronta_ws_api' as issuer
FROM contapronta_contapronta_ws_api
WHERE CAST(from_unixtime(startdatetime / 1000) AS date) BETWEEN date '2024-06-01' AND date '2024-06-30'
GROUP BY category

UNION ALL

SELECT category, COUNT(*) as occurrences, 'cronos_cronos_ws_api' as issuer
FROM cronos_cronos_ws_api
WHERE CAST(from_unixtime(startdatetime / 1000) AS date) BETWEEN date '2024-06-01' AND date '2024-06-30'
GROUP BY category

UNION ALL

SELECT category, COUNT(*) as occurrences, 'delcred_delcred_ws_api' as issuer
FROM delcred_delcred_ws_api
WHERE CAST(from_unixtime(startdatetime / 1000) AS date) BETWEEN date '2024-06-01' AND date '2024-06-30'
GROUP BY category

UNION ALL

SELECT category, COUNT(*) as occurrences, 'ewally_elo_ewally_elo_ws_api' as issuer
FROM ewally_elo_ewally_elo_ws_api
WHERE CAST(from_unixtime(startdatetime / 1000) AS date) BETWEEN date '2024-06-01' AND date '2024-06-30'
GROUP BY category

UNION ALL

SELECT category, COUNT(*) as occurrences, 'ewally_ewally_ws_api' as issuer
FROM ewally_ewally_ws_api
WHERE CAST(from_unixtime(startdatetime / 1000) AS date) BETWEEN date '2024-06-01' AND date '2024-06-30'
GROUP BY category

UNION ALL

SELECT category, COUNT(*) as occurrences, 'fitbank_fitbank_ws_api' as issuer
FROM fitbank_fitbank_ws_api
WHERE CAST(from_unixtime(startdatetime / 1000) AS date) BETWEEN date '2024-06-01' AND date '2024-06-30'
GROUP BY category

UNION ALL

SELECT category, COUNT(*) as occurrences, 'ifood_ifood_ws_api' as issuer
FROM ifood_ifood_ws_api
WHERE CAST(from_unixtime(startdatetime / 1000) AS date) BETWEEN date '2024-06-01' AND date '2024-06-30'
GROUP BY category

UNION ALL

SELECT category, COUNT(*) as occurrences, 'microbanco_microbanco_ws_api' as issuer
FROM microbanco_microbanco_ws_api
WHERE CAST(from_unixtime(startdatetime / 1000) AS date) BETWEEN date '2024-06-01' AND date '2024-06-30'
GROUP BY category

UNION ALL

SELECT category, COUNT(*) as occurrences, 'kardbank_kardbank_ws_api' as issuer
FROM kardbank_kardbank_ws_api
WHERE CAST(from_unixtime(startdatetime / 1000) AS date) BETWEEN date '2024-06-01' AND date '2024-06-30'
GROUP BY category

UNION ALL

SELECT category, COUNT(*) as occurrences, 'pagai_pagai_ws_api' as issuer
FROM pagai_pagai_ws_api
WHERE CAST(from_unixtime(startdatetime / 1000) AS date) BETWEEN date '2024-06-01' AND date '2024-06-30'
GROUP BY category

UNION ALL

SELECT category, COUNT(*) as occurrences, 'pagme_pagme_ws_api' as issuer
FROM pagme_pagme_ws_api
WHERE CAST(from_unixtime(startdatetime / 1000) AS date) BETWEEN date '2024-06-01' AND date '2024-06-30'
GROUP BY category

UNION ALL

SELECT category, COUNT(*) as occurrences, 'pagprime_pagprime_ws_api' as issuer
FROM pagprime_pagprime_ws_api
WHERE CAST(from_unixtime(startdatetime / 1000) AS date) BETWEEN date '2024-06-01' AND date '2024-06-30'
GROUP BY category

UNION ALL

SELECT category, COUNT(*) as occurrences, 'pentest_pentest_ws_api' as issuer
FROM pentest_pentest_ws_api
WHERE CAST(from_unixtime(startdatetime / 1000) AS date) BETWEEN date '2024-06-01' AND date '2024-06-30'
GROUP BY category

UNION ALL

SELECT category, COUNT(*) as occurrences, 'qgx_qgx_ws_api' as issuer
FROM qgx_qgx_ws_api
WHERE CAST(from_unixtime(startdatetime / 1000) AS date) BETWEEN date '2024-06-01' AND date '2024-06-30'
GROUP BY category


UNION ALL

SELECT category, COUNT(*) as occurrences, 'qitech_qitech_ws_api' as issuer
FROM qitech_qitech_ws_api
WHERE CAST(from_unixtime(startdatetime / 1000) AS date) BETWEEN date '2024-06-01' AND date '2024-06-30'
GROUP BY category


UNION ALL

SELECT category, COUNT(*) as occurrences, 'selfpay_selfpay_ws_api' as issuer
FROM selfpay_selfpay_ws_api
WHERE CAST(from_unixtime(startdatetime / 1000) AS date) BETWEEN date '2024-06-01' AND date '2024-06-30'
GROUP BY category


UNION ALL

SELECT category, COUNT(*) as occurrences, 'seuvale_seuvale_ws_api' as issuer
FROM seuvale_seuvale_ws_api
WHERE CAST(from_unixtime(startdatetime / 1000) AS date) BETWEEN date '2024-06-01' AND date '2024-06-30'
GROUP BY category


UNION ALL

SELECT category, COUNT(*) as occurrences, 'sulcredi_pos_sulcredi_pos_ws_api' as issuer
FROM sulcredi_pos_sulcredi_pos_ws_api
WHERE CAST(from_unixtime(startdatetime / 1000) AS date) BETWEEN date '2024-06-01' AND date '2024-06-30'
GROUP BY category

UNION ALL

SELECT category, COUNT(*) as occurrences, 'sulcredi_sulcredi_ws_api' as issuer
FROM sulcredi_sulcredi_ws_api
WHERE CAST(from_unixtime(startdatetime / 1000) AS date) BETWEEN date '2024-06-01' AND date '2024-06-30'
GROUP BY category

UNION ALL

SELECT category, COUNT(*) as occurrences, 't10_t10_ws_api' as issuer
FROM t10_t10_ws_api
WHERE CAST(from_unixtime(startdatetime / 1000) AS date) BETWEEN date '2024-06-01' AND date '2024-06-30'
GROUP BY category

UNION ALL

SELECT category, COUNT(*) as occurrences, 'verocard_verocard_ws_api' as issuer
FROM verocard_verocard_ws_api
WHERE CAST(from_unixtime(startdatetime / 1000) AS date) BETWEEN date '2024-06-01' AND date '2024-06-30'
GROUP BY category

UNION ALL

SELECT category, COUNT(*) as occurrences, 'volus_volus_ws_api' as issuer
FROM volus_volus_ws_api
WHERE CAST(from_unixtime(startdatetime / 1000) AS date) BETWEEN date '2024-06-01' AND date '2024-06-30'
GROUP BY category

ORDER BY occurrences DESC;
