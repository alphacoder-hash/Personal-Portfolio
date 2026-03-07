import { NextResponse } from 'next/server';

function logToDebug(message: string) {
    console.log(`[API Debug] ${message}`);
}

export async function POST(request: Request) {
    logToDebug("POST request received at /api/contact");
    try {
        const data = await request.json();
        logToDebug(`Data received: ${JSON.stringify(data)}`);

        const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
        logToDebug(`Access Key found: ${accessKey ? "Yes (starts with " + accessKey.substring(0, 4) + ")" : "No"}`);

        if (!accessKey) {
            logToDebug("ERROR: WEB3FORMS_ACCESS_KEY is missing");
            return NextResponse.json(
                { success: false, message: "Server configuration error" },
                { status: 500 }
            );
        }

        logToDebug("Sending request to Web3Forms...");
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                ...data,
                access_key: accessKey,
                from_name: "Portfolio Inquiry",
                subject: `New Contact from ${data.name}: ${data.subject || 'No Subject'}`
            }),
        });

        const result = await response.json();
        logToDebug(`Web3Forms response status: ${response.status}`);
        logToDebug(`Web3Forms response body: ${JSON.stringify(result)}`);

        if (response.ok) {
            logToDebug("Success!");
            return NextResponse.json({ success: true, data: result });
        } else {
            logToDebug(`Failure: ${result.message}`);
            return NextResponse.json(
                { success: false, message: result.message || "Failed to send message" },
                { status: response.status }
            );
        }
    } catch (error: any) {
        logToDebug(`CRITICAL ERROR: ${error.message}`);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}
