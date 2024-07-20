import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const categories = await prisma.category.createMany({
    data: [
      { name: 'Health & Beauty' },
      { name: `Women's Fashion` },
      { name: `Men's Fashion` },
      { name: 'Luxury' },
      { name: 'Electronics' },
      { name: 'Food' }
    ]
  });

  const zavy = await prisma.user.upsert({
    where: { username: 'strathmall' },

    update: {},

    create: {
      username: 'strathmall',
      name: 'strathmall',
      password:
        '$argon2id$v=19$m=65536,t=3,p=4$uVDjpuMv7g3wC6CNgDBy+Q$6HD+S6GGRI3Dp1YQlwwEGuMFWmwuPMMEtiC44YlDzHA',
      seller: {
        create: {
          storeEmail: '',
          storeName: `strathmall's Store`,
          products: {
            create: [
              {
                priceInCents: '1000',
                title: 'New watch ',
                image:
                  '1721336730/samples/ecommerce/analog-classic.jpg',
                description: '  New watch with a leather strap',
                category: {
                  connect: {
                    id: 2
                  }
                }
              },

              {
                priceInCents: '2700',
                title: 'Men Flap Pocket Corduroy Shirt',
                image: '1721506569/shirt_vswgx7.jpg',
                description: 'Regular fit fabric with slight stretch',
                category: {
                  connect: {
                    id: 3
                  }
                }
              },
              {
                priceInCents: '2500',
                title: 'Men V Neck Cable Knit Sweater',
                image: '1721506569/Perfume_yamqjg.webp',
                description: 'Cable-knit and regular fit',
                category: {
                  connect: {
                    id: 3
                  }
                }
              },

              {
                priceInCents: '1100',
                title: 'Neckline ',
                image: '1721506569/necklace_iwb2kj.jpg',
                description: 'Notched neckline and non-stretch',
                category: {
                  connect: {
                    id: 2
                  }
                }
              },
              {
                priceInCents: '14600',
                title: 'Chanel N°5 ',
                image: '1721506569/Perfume_yamqjg.webp',
                description:
                  'Since its creation in 1921, N°5 has exuded the very essence of femininity. The abstract, mysterious scent—alive with countless subtle facets—radiates an extravagant floral richness.',
                category: {
                  connect: {
                    id: 4
                  }
                }
              }
            ]
          }
        }
      },
      buyer: {
        create: {
          addresses: {
            create: {
              addressLine1: 'Madaraka',
              city: 'Nairobi',
              country: 'Kenya',
              region: 'Nairobi',
              isDefault: true,
              postalCode: 'NW1'
            }
          }
        }
      }
    }
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
