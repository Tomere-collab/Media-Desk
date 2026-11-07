import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      full_name,
      email,
      phone,
      applicant_type,
      instagram,
      tiktok,
      contribution
    } = body;

    if (!full_name || !email || !phone || !applicant_type || !contribution) {
      return NextResponse.json(
        { error: 'Please complete all required fields.' },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: 'Application service is not configured yet.' },
        { status: 503 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error } = await supabase
      .from('media_applications')
      .insert([{
        full_name,
        email,
        phone,
        applicant_type,
        instagram: instagram || null,
        tiktok: tiktok || null,
        contribution,
        status: 'Under review'
      }]);

    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: 'Application received.'
    });

  } catch (error) {
    console.error('Application submission error:', error);

    return NextResponse.json(
      { error: 'Unable to submit application. Please try again later.' },
      { status: 500 }
    );
  }
}