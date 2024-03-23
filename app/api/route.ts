"use server";

import { NextRequest } from "next/server";

async function GET(req: NextRequest) {

    return new Response("Hello", {
        status: 200
    })
}

export { GET }