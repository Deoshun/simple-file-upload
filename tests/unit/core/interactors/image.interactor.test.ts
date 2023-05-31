import { imageInteractor } from '../../../../src/core/interactors/main.interactor';
import ImageEntity from '../../../../src/core/entities/image.entity';
import { HTTP_STATUS } from '../../../../src/core/const/http';

describe("Trip Interactor", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })
    describe("process", () => {
        test("should process existing trip data approtiatley", async () => {
            const mockImageResponse: Partial<ImageEntity> = {
              id: 1
            };
            
            const mockImage: any = {
              fieldname: "image",
              originalname: "chrollo_lucilfer_v2__hunter_x_hunter__minimalism_by_greenmapple17_d8kymsg.png",
              encoding: "7bit",
              mimetype: "image/png",
              destination: "uploads/",
              filename: "6ab2f98115f4300cc3580957853e98c3",
              path: "uploads\\6ab2f98115f4300cc3580957853e98c3",
              size: 46602
            }

            
            const mockObj = jest.spyOn(imageInteractor.imageRepository, "add").mockImplementation(() => Promise.resolve(mockImageResponse));
            
            
            const response = await imageInteractor.process(mockImage);
            
            expect(imageInteractor.imageRepository.add).toBeCalledTimes(1);

            expect(mockObj.mock.calls[0][0]).toEqual(mockImage);
            expect(response.status).toEqual(HTTP_STATUS.OK);
            expect(response.data).toEqual({ id: 1 });
        });
        
    });

})