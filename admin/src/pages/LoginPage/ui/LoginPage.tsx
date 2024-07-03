import React, { Suspense } from 'react';
import { Page } from '@/widgets/Page';
import { LoginForm } from '@/features/AuthByEmail';
import { Loader } from '@/shared/ui/Loader';

const LoginPage = () => {
    return (
        <Page data-testid="LoginPage">
            <Suspense fallback={<Loader />}>
                <LoginForm />
            </Suspense>
        </Page>
    );
};

export default LoginPage;
