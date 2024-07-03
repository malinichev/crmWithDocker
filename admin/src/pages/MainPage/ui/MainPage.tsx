import React, { memo } from 'react';
import { Page } from '@/widgets/Page';

const MainPage = memo(() => {
    // const [loading, setLoading] = useState(true);
    // const dispatch = useAppDispatch();
    // const pageData = useSelector(getPageData(1));
    //
    // useEffect(() => {
    //     dispatch(getPageByIdService(1)).then(() => setLoading(false));
    // }, [dispatch]);
    //
    // const onSend = useCallback(
    //     (newData: string, newLine: { path: string; value: string }) => {
    //         let newJson = JSON.parse(JSON.stringify(pageData?.json || {}));
    //
    //         const newDiv = document.createElement('div');
    //         newDiv.innerHTML = newData ?? '';
    //         const elements = newDiv.querySelectorAll('.val');
    //
    //         elements?.forEach((element) => {
    //             const value = element.innerHTML ?? '';
    //             const path = element.getAttribute('data-path');
    //             if (path) {
    //                 _set(newJson, path, value);
    //             }
    //         });
    //
    //         try {
    //             if (newLine && newLine.path && newLine.value) {
    //                 _set(
    //                     newJson,
    //                     newLine.path,
    //                     JSON.parse(JSON.stringify(newLine.value)),
    //                 );
    //             }
    //             if (newLine && newLine.path && !newLine.value) {
    //                 newJson = _omit(newJson, newLine.path?.split('.'));
    //             }
    //
    //             if (!newJson || Object.keys(newJson).length === 0) {
    //                 return;
    //             }
    //             setLoading(true);
    //
    //             dispatch(
    //                 savePageService({
    //                     id: 1,
    //                     json: newJson,
    //                 }),
    //             ).then(() => setLoading(false));
    //         } catch (e) {
    //             setLoading(false);
    //             console.log(e);
    //         }
    //     },
    //     [dispatch, pageData?.json],
    // );

    return (
        <Page data-testid="MainPage">
            <div>2222222</div>
            {/* {loading && <Loader />} */}
            {/* <Code onSend={onSend} json={pageData?.json || {}} /> */}
        </Page>
    );
});

export default MainPage;
