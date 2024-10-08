export interface GeoResponse {
    ip: string
    location: Location
    as: As
    isp: string
}

export interface Location {
    country: string
    region: string
    timezone: string
}

export interface As {
    asn: number
    name: string
    route: string
    domain: string
    type: string
}