const wdk = require('wikidata-sdk')

const authorQid = 'Q535'
const sparql = `
#Recent Events
SELECT ?event ?eventLabel ?date ?endDate
WHERE
{
  # find events
  ?event wdt:P31/wdt:P279* wd:Q1190554.
  # with a point in time or start date
  # OPTIONAL { ?event wdt:P585 ?date. }
  ?event wdt:P580 ?date.
  ?event wdt:P582 ?endDate.
  # ?event wdt:P17 wd:Q96.

  # but at least one of those
  # FILTER(BOUND(?date) && DATATYPE(?date) = xsd:dateTime).
  # not in the future, and not more than 31 days ago
  # BIND(NOW() - ?date AS ?distance).
  # FILTER(0 <= ?distance && ?distance < 31).
  # and get a label as well
  OPTIONAL {
    ?event rdfs:label ?eventLabel.
    FILTER(LANG(?eventLabel) = "en").
  }
}
# limit to 10 results so we don't timeout
# LIMIT 30
`
const url = wdk.sparqlQuery(sparql)


console.log(url)
